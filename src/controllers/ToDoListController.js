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