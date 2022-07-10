const AWS = require('aws-sdk');
const util = require('../utils/util.js');
const auth = require('../utils/auth');
 

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'users';

function verify(requestBody) {
    if(!requestBody.user || !requestBody.user.userId || !requestBody.token){
        return util.buildResponse(401, {
            verified: false,
            message: 'incorrect request body'
        })
    }

    const user = requestBody.user;
    const token = requestBody.token;
    const verification = auth.verifyToken(user.userId, token);
    console.log(token);
    if(!verification.verified) {
        return util.buildResponse(401, verification);
    }

    return util.buildResponse(200, {
        verified:  true,
        message: 'success',
        user: user,
        token: token
    })
}
module.exports.verify = verify;