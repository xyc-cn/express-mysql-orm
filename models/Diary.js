/**
 * Created by Administrator on 14-7-22.
 */
var DbStore = require('./BasicModel');
var Sequelize = require("sequelize");
function DiaryBean(title,author,content,type){
    this.title =title;
    this.author = author;
    this.content = content;
    this.type = type;
}
module.exports = DiaryBean;
var Diary = DbStore.define('Diary', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKeys: true, unique: true},
    title: {type: Sequelize.STRING, allowNull: false},
    type: {type: Sequelize.STRING, allowNull: false},
    content:{type:Sequelize.TEXT,allowNull:false},
    author :{type: Sequelize.STRING, allowNull: false}
});
Diary.sync().on('success',function () {
    console.log('aa..');
}).on('failure', function () {
        console.log('bb..');
    });
DiaryBean.builds = function (DiaryBean,callback) {
    Diary.build({'title': DiaryBean.title, 'type': DiaryBean.type ,'content' :DiaryBean.content,'author':DiaryBean.author}).save().on('success',function (msg) {
        console.log(msg);
        if (!!callback) {
            callback(msg);
        }
    }).on('failure', function (err) {
            console.log(err);
            if (!!callback) {
                callback(msg);
            }
        });
}
DiaryBean.findById =  function(id,callback){
    Diary.find(id).success(function(res){
        console.log(res);
        if(!!callback){
            callback(res);
        }
    });
}

DiaryBean.findAndCountAllByType = function(type,page,callback){
    Diary.findAndCountAll({
        where: {type:type},
        offset:page*5,
        limit:5
    }).success(function(result) {
            callback(result);
    });
}
DiaryBean.modify = function(id,data,callback){
    Diary.find(id).success(function(res){
        if(res){
            res.updateAttributes(data).success(function(){
                callback('success');
            })
        }else{
            callback('error');
        }
    })
}
DiaryBean.delete= function(id,callback){
    Diary.find(id).success(function(res){
        if(res){
            res.destroy().success(function(){
                callback("ok");
            }).error(function(err) {
                    callback(err);

            });
        }
        else{
            callback("nofound");
        }
    });
}