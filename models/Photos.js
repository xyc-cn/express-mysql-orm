/**
 * Created by Administrator on 14-7-31.
 */
var DbStore = require('./BasicModel');
var Sequelize = require("sequelize");
function PhotoBean(weight,name,url,affect){
    this.weight  = weight;
    this.name = name;
    this.url=url;
    this.affect= affect;
}
module.exports = PhotoBean;
var Photo = DbStore.define('Photo', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKeys: true, unique: true},
    name: {type: Sequelize.STRING, allowNull: false},
    url: {type: Sequelize.STRING, allowNull: false},
    affect:{type:Sequelize.INTEGER,allowNull:false},
    weight:{type: Sequelize.STRING, allowNull: false}
});
Photo.sync().on('success',function () {
    console.log('aa..');
}).on('failure', function () {
    console.log('bb..');
});
PhotoBean.builds = function (PhotoBean,succCb, errCb) {
    Photo.build({name:PhotoBean.name, url:PhotoBean.url,weight:PhotoBean.weight,affect:PhotoBean.affect}).save().on('success',function (msg) {
        console.log(msg);
        if (!!succCb) {
            succCb(msg);
        }
    }).on('failure', function (err) {
            console.log(err);
            if (!!errCb) {
                errCb(msg);
            }
        });
}
PhotoBean.findAndCountAllByType = function(page,callback){
    Photo.findAll({
        order:'weight',
        offset:page*5,
        limit:5
    }).success(function(result) {
            callback(result);
    });
}
PhotoBean.delete = function(id,callback){
    Photo.find(id).success(function(res){
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
PhotoBean.update = function(id,data ,callback) {
    Photo.find(id).success(function(res){
        if(res){
            res.updateAttributes(data).success(function(){
                callback('success');
            })
        }else{
            callback('error');
        }
    })

}