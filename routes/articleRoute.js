/**
 * Created by xieyicheng on 2014/10/14.
 */

var filiter = require('./filiter.js');
var Diary = require('../models/Diary.js');
module.exports = function(app) {

    app.get('/post',filiter.checkLogin);
    app.get('/post', function (req, res) {
        req.flash('info', 'Welcome');
        res.render('post', {
            title: 'Home',
            info: req.flash("info").toString()
        })
    });
    //新增文章
    app.post("/postDiary",filiter.checkLogin);
    app.post("/postDiary",function(req,res){
        var content = req.body.content;
        var title = req.body.title;
        var author = req.body.author;
        var type = req.body.type;
        if(content!=null&title!=null&author!=null&type!=null){
            var diary = new Diary(title,author,content,type);
            Diary.builds(diary);
            res.redirect('/diary?page=0&type=1');
        }
        else{
            res.render('404');
        }

    });
    //获取文章内容
    app.get('/diary',filiter.checkLogin);
    app.get('/diary', function (req, res) {
        req.flash('info', 'Flash is back!');
        var type = req.query.type;
        var page = req.query.page;
        if(type!=null&&page!=null){
            Diary.findAndCountAllByType(type,page,function(data){
                // res.writeHead(200, { 'Content-Type': 'text/javascript;charset=utf-8' });
                // res.end(JSON.stringify(data));
                res.render('showPost',{list:data['rows'],article:"article",type:type});
            });

        }else{
            res.render('404');;
        }


    });
    //显示一篇文章
    app.get('/showDiaryById',filiter.checkLogin);
    app.get('/showDiaryById',function(req,res){
        var id = req.query.id;
        Diary.findById(id,function(data){
            if(data){
                data.dataValues.article="article";
                res.render("diaryItem",data.dataValues);
            }
            else{
                res.render("404");
            }
        })
    });
    //删除文件
    app.get('/deleteDiaryById',filiter.checkLogin);
    app.get('/deleteDiaryById',function(req,res){
        var id = req.query.id;
        var type= req.query.type;
        if(!id){
            res.render('404')
        }
        else{
            Diary.delete(id,function(data){
                res.redirect('/diary?page=0&type='+type)
            })
        }
    })
    //获取一篇文章api
    app.get('/onediary',function(req,res){
        var id = req.query.id;
        Diary.findById(id,function(data){
            res.writeHead(200, { 'Content-Type': 'text/javascript;charset=utf-8' })
            res.end(JSON.stringify(data));
        })

    })
    //获取文章列表
    app.get('/diarylist',function(req,res){
        var page = req.query.page;
        var type = req.query.type;
        Diary.findAndCountAllByType(type,page, function (data) {
            if(data!=null){
                res.writeHead(200, { 'Content-Type': 'text/javascript;charset=utf-8' })
                res.end(JSON.stringify(data));
            }
        })

    })



}

