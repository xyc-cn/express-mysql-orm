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
            res.redirect('/');
        }
        else{
            res.end(JSON.stringify("ddff"));
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
                res.render('index',{list:data['rows'],article:"article"});
            });

        }else{
            res.end(JSON.stringify("parameter error"));
        }

    });



}

