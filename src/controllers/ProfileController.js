const ProfileModel = require("../models/ProfileModel");
var jwt = require('jsonwebtoken');

exports.CreateProfile = (request, response) => {
    let reqbody = request.body;
    ProfileModel.create(reqbody, (error, data) => {
        if(error) {
            response.status(400).json({status: "fail", data:error});
        }
        else{
            response.status(200).json({status: "success", data:data});
        }
    });
}

exports.UserLogin = (request, response) => {
    let UserName = request.body['UserName'];
    let Password = request.body['Password'];
    ProfileModel.find({UserName:UserName, Password:Password}, (error, data) => {
        if(error){
            response.status(400).json({status: "fail", data:error});
        }
        else{
            if(data.length>0){

                //Create Auth Token
                let Payload = {
                    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                    data:data[0]
                } 
                let token = jwt.sign(Payload, 'SecretKey123456789');
                response.status(200).json({status: "success", token: token, data:data[0]});
            }
            else{
                response.status(401).json({status: "Unauthorized"});
            }
        }
    });

}

exports.SelectProfile = (request, response) => {
    let UserName = request.headers['username'];
    ProfileModel.find({UserName:UserName}, (error, data) => {
        if(error) {
            response.status(400).json({status: "fail", data:error});
        }
        else{
            response.status(200).json({status: "success", data:data});
        }
    });

}