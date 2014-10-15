
/*
 * GET home page.
 */
var Photo =  require('../models/Photos.js');
var filiter = require('./filiter.js');
var fs = require('fs');
module.exports = function(app) {

    //大图页面
    app.get('/addphoto',filiter.checkLogin);
    app.get('/addphoto', function (req, res) {
        res.render('addPhoto',{photo:"photo"})
    });
    //大图设置
    app.get('/photoSetting',filiter.checkLogin);
    app.get('/photoSetting', function (req, res) {
        var page = req.query.page;
        if(page!=null){
            Photo.findAndCountAllByType(page,function(data){
                res.render('photo',{list:data,photo:"photo"});
            });
        }

    });
    //图片上传
    app.post('/upload',filiter.checkLogin);
    app.post('/upload', function (req, res) {
        var name = req.body.bannername;
        console.log(name);
        var weight = req.body.weight;
        if(name!=null&&weight!=null){
            if (req.files.upfile.size == 0){
                // 使用同步方式删除一个文件
                fs.unlinkSync(req.files.upfile.path);
                console.log('Successfully removed an empty file!');
            } else {
                var target_path = './public/images/' + req.files.upfile.name;
                // 使用同步方式重命名一个文件
                fs.renameSync(req.files.upfile.path, target_path);
                console.log('Successfully rename an  file!');
                var url ='/images/' + req.files.upfile.name;
                var photo = new Photo(weight,name,url,1);
                Photo.builds(photo);
            }

        }
        req.flash("info","success");
        res.redirect('/photoSetting?page=0');
    });

    //删除图片
    app.get('/deletePhoto',filiter.checkLogin);
    app.get('/deletePhoto', function (req, res) {
        var src = req.query.src;
        var target = 'public'+src;
        var id = req.query.id;
        if(src!=null&&id!=null){
            Photo.delete(id,function(){
                fs.unlinkSync(target);
                console.log('delete'+target);
                res.redirect('/photoSetting?page=0');
            });
        }
        else{
            res.redirect('/photoSetting?page=0');
        }

    });



}

