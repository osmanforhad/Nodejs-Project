const e = require('express');
var jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    let Token = request.headers['token-key']
    jwt.verify(Token, "SecretKey123456789", function(error, decoded) {
        if(error){
            response.status(401).json({status: "Unauthorized"});
        }
        else{
            next();
        }
    });
}