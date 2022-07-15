const registerService = require('./services/register');
const loginService = require('./services/login');
const verifyService = require('./services/verify');
const util = require('./utils/util.js')

const healthPath = '/health';
const registerPath = '/register';
const loginPath = '/login';
const verifyPath = '/verify';

exports.handler = async (event) => {
    console.log('Reqeust Event: ', event);
    let response;
    switch(true){
        case event.httpMethod === 'OPTIONS':
            response = util.buildCORSResponse(200, 'Success');
            break;
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = util.buildResponse(200, 'Health check passed');
            break; 
        case event.httpMethod === 'POST' && event.path === registerPath:
            const registerBody = JSON.parse(event.body);
            response = registerService.register(registerBody);
            break;
        case event.httpMethod === 'POST' && event.path === loginPath:
            const loginBody = JSON.parse(event.body);
            response = loginService.login(loginBody);
            break; 
        case event.httpMethod === 'POST' && event.path === verifyPath:
            const verifyBody = JSON.parse(event.body);
            response = verifyService.verify(verifyBody)
            break;  
        default: 
            response =  util.buildResponse(404, '404 Not found');
            break;
    }
    return response;
};
 
