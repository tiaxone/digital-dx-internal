const jwt = require('jsonwebtoken');


function generateToken(userInfo) {
    if(!userInfo){
        return null
    }

    return jwt.sign(userInfo, process.env.SECRET, {
        expiresIn: '1h'
    })
}

function verifyToken(userId, token) {
    console.log()
    return jwt.verify(token, process.env.SECRET, (error, response) => {
        console.log(error);
        if(error){
            return {
                verified: false,
                message: 'invalid token'
            }
        }

        if(response.userId !== userId) {
            return {
                verified: false,
                message: 'invalid user'
            }
        }

        return {
            verified: true,
            message: 'Verifed'
        }
    })


}
module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;