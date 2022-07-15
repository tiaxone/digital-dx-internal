const AWS = require('aws-sdk');
const util = require('../utils/util.js');
const bcrypt = require('bcryptjs');


const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'users';

async function register(userInfo) {
    const name = userInfo.name;
    const email = userInfo.email;
    const username = userInfo.username;
    const password = userInfo.password;
    const role = userInfo.role ?? 'customer'
    const userId = userInfo.email.toLowerCase().trim();
    const companyName = userInfo.companyName;
    if(!username || !name || !email || !password)
    {
        return util.buildResponse(404, {message: 'All fields are required'});
    }
    
    const dynamoUser = await getUser(userId);
    if(dynamoUser && dynamoUser.userId){
        return util.buildResponse(401, {message: 'Sorry, User name exist'})
    }
    const encryptedPW = bcrypt.hashSync(password.trim(), 10)

    const user = {
        name: name,
        userId: userId,
        email: email,
        role: role,
        username: username,
        password: encryptedPW,
        companyName: companyName
    }

    const saveUserResponse = await saveUser(user);
    if(!saveUserResponse) {
        return util.buildResponse(503, {message: 'error saving user'});
    }

    return util.buildResponse(200, {username: username});
 }

 async function getUser(userId) {
    const params = {
        TableName: userTable,
        Key: {
            userId: userId,
            role: "customer"
        }
    }
    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error => {
        console.error('There is an error', error);
    })
 }

 async function saveUser (user) {
    const params = {
        TableName: userTable,
        Item: user
    }
    return await dynamodb.put(params).promise().then(() => {
        console.log("Woot! Writing to dynamoDb");
        return true
    }, error => {
        console.error('Ther is an error saving user: ', error)
    });
 }

 module.exports.register = register;