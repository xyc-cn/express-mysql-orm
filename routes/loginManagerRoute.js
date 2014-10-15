/**
 * Created by xieyicheng on 2014/10/14.
 */

/*
 * GET home page.
 */
var User =  require('../models/User.js');
module.exports = function(app) {
    //添加用户测试用
    app.get('/adduser',function(req,res){
        var username = req.query.username;
        var password = req.query.password;
        if(!username||!password){
            res.end(JSON.stringify("err"))
        }
        else{
            User.builds(username,password,function(data){
                console.log('success '+data)
            },function(data){
                console.log('err '+data)
            })
        }
    })
    //登出
    app.get('/logout', function (req, res) {
        req.session.user = null;
        req.flash('success', '登出成功!');
        res.redirect('/login');//登出成功后跳转到主页
    });
    //登录页面
    app.get('/login', function (req, res) {
        res.render('login',{data:req.flash("info")});
    });
    //登陆
    app.post('/postlogin', function (req, res) {
        var username= req.body.username;
        var password = req.body.password;
        if(username!=null&&password!=null){
            User.findByUsernameAndPassword(username,password,function(data){
                if(data!=null){
                    req.session.user = data;
                    console.log(data)
                    res.redirect('/diary?page=0&type=1')
                }
                else{
                    req.flash("info","err");
                    res.redirect('/login')
                }
            });
        }

    });

}

