const AWS = require('aws-sdk');
const util = require('../utils/util.js');
const bcrypt = require('bcryptjs');
const auth = require('../utils/auth');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'users';
const defaultRole = 'customer';

async function login(user) {
    const userId = user.userId;
    const password = user.password;
    if(!user || !userId || !password) {
        return util.buildResponse(401, {message: 'username and password are required'})
    }

    const dynamoUser = await getUser(userId.toLowerCase().trim());
    if(!dynamoUser || !dynamoUser.userId) {
        return util.buildResponse(403, {message: 'User does not exist'})
    }

    if(!bcrypt.compareSync(password, dynamoUser.password)){
        return util.buildResponse(403, {message: 'password is incorect'})
    }

    const userInfo = {
        userId: dynamoUser.userId,
        name: dynamoUser.name
    }

    const token = auth.generateToken(userInfo); 
    const response = {
        user: userInfo,
        token: token
    }

    return util.buildResponse(200, response); 

}

async function getUser(userId) {
    const params = {
        TableName: userTable,
        Key: {
            userId: userId,
            role: defaultRole
        }
    }
    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error => {
        console.error('there is an error', error);
    })
 }

 
 module.exports.login = login;