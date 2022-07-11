const ToDoListModel = require("../models/ToDoListModel");

exports.CreateToDo = (request, response) => {
    let reqBody = request.body;

    let ToDoSubject = reqBody['ToDoSubject'];
    let ToDoDescription = reqBody['ToDoDescription'];
    let UserName = request.headers['username'];
    let ToDoStatus = "New";
    let ToDoCreateDate = Date.now();
    let ToDoUpdateDate = Date.now();

    let PostBody = {
        UserName:UserName,
        ToDoSubject:ToDoSubject,
        ToDoDescription:ToDoDescription,
        ToDoStatus:ToDoStatus,
        ToDoCreateDate:ToDoCreateDate,
        ToDoUpdateDate:ToDoUpdateDate
    }

    ToDoListModel.create(PostBody, (error, data) => {
        if(error) {
            response.status(400).json({status: "fail", data:error});
        }
        else{
            response.status(200).json({status: "success", data:data});
        }
    });
}

exports.SelectToDo = (request, response) => {
    let UserName = request.headers['username'];
    ToDoListModel.find({UserName:UserName}, (error, data) => {
        if(error) {
            response.status(400).json({status: "fail", data:error});
        }
        else{
            response.status(200).json({status: "success", data:data});
        }
    });

}

exports.UpdateToDo = (request, response) => {
   let ToDoSubject = request.body['ToDoSubject'];
   let ToDoDescription = request.body['ToDoDescription'];
   let _id = request.body['_id'];
   let ToDoUpdateDate = Date.now();

   let PostBody = {
    ToDoSubject: ToDoSubject,
    ToDoDescription: ToDoDescription,
    ToDoUpdateDate: ToDoUpdateDate
   }

   ToDoListModel.updateOne({_id:_id}, {$set:PostBody}, {upsert:true}, (error, data) => {
    if(error) {
        response.status(400).json({status: "fail", data:error});
    }
    else{
        response.status(200).json({status: "success", data:data});
    }
   });

}

exports.UpdateToDoStatus = (request, response) => {
    let ToDoStatus = request.body['ToDoStatus'];
    let _id = request.body['_id'];
    let ToDoUpdateDate = Date.now();
 
    let PostBody = {
        ToDoStatus: ToDoStatus,
     ToDoUpdateDate: ToDoUpdateDate
    }
 
    ToDoListModel.updateOne({_id:_id}, {$set:PostBody}, {upsert:true}, (error, data) => {
     if(error) {
         response.status(400).json({status: "fail", data:error});
     }
     else{
         response.status(200).json({status: "success", data:data});
     }
    });
 
 }

 exports.RemoveToDo = (request, response) => {
    let _id = request.body['_id'];
 
    ToDoListModel.remove({_id:_id}, (error, data) => {
     if(error) {
         response.status(400).json({status: "fail", data:error});
     }
     else{
         response.status(200).json({status: "success", data:data});
     }
    });
 
 }

 exports.SelectToDoByStatus = (request, response) => {
    let UserName = request.headers['username'];
    let ToDoStatus = request.body['ToDoStatus'];
    ToDoListModel.find({UserName:UserName, ToDoStatus:ToDoStatus}, (error, data) => {
        if(error) {
            response.status(400).json({status: "fail", data:error});
        }
        else{
            response.status(200).json({status: "success", data:data});
        }
    });

}

exports.SelectToDoByDate = (request, response) => {
    let UserName = request.headers['username'];
    let FormDate = request.body['FormDate'];
    let ToDate = request.body['ToDate'];
    ToDoListModel.find({UserName:UserName, ToDoCreateDate:{$gte:new Date(FormDate), $lte:new Date(ToDate)}}, (error, data) => {
        if(error) {
            response.status(400).json({status: "fail", data:error});
        }
        else{
            response.status(200).json({status: "success", data:data});
        }
    });

}