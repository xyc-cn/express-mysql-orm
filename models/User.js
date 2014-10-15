/**
 * Created by Administrator on 14-7-22.
 */
var DbStore = require('./BasicModel');
var Sequelize = require("sequelize");
function UserBean(username, password) {
    this.username = username;
    this.password = password;
}
module.exports = UserBean;
var User = DbStore.define('User', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKeys: true, unique: true},
    username: {type: Sequelize.STRING, allowNull: false},
    password: {type: Sequelize.STRING, allowNull: false}
});
User.sync().on('success',function () {
    console.log('aa..');
}).on('failure', function () {
    console.log('bb..');
});
UserBean.builds = function (username, password, succCb, errCb) {
    User.build({username: username, 'password': password}).save().on('success',function (msg) {
        if (!!succCb) {
            succCb(msg);
        }
    }).on('failure', function (err) {
            if (!!errCb) {
                errCb(msg);
            }
      });
}
UserBean.finds = function(username,callback){
    User.find({where:{username:'s'}}).success(function(res){
        console.log(res);
            if(!!callback){
            callback(res);
            }
        });
}
UserBean.findById =  function(id,callback){
    User.find(id).success(function(res){
        console.log(res);
        if(!!callback){
            callback(res);
        }
    });
}
UserBean.findByUsernameAndPassword=function(username,password,callback){
    User.find({where:{username:username,password:password}}).success(function(data){
        if(!!callback){
            callback(data);
        }
    });
}
UserBean.findAndCountAll = function(callback){
   User.findAndCountAll({
        where: ["username LIKE 's%'"],
        offset: 10,
        limit: 2
    })
        .success(function(result) {
            callback(result);
        });
}
UserBean.update = function(id,data ,callback) {
    User.find(id).success(function(res){
        if(res){
            res.updateAttributes(data).success(function(){
                callback('error');
        })
        }else{
            callback('error');
        }
    })

}
UserBean.delete = function(id,callback){
    User.find(id).success(function(res){
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