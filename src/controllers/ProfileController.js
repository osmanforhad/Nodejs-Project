const ProfileModel = require("../models/ProfileModel");

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