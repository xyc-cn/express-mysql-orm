
/*
 * GET home page.
 */
var photoRoute = require('./photoRoute');
var articleRoute = require('./articleRoute');
var loginManagerRoute = require('./loginManagerRoute');
module.exports = function(app) {
    //启用路由
    photoRoute(app);
    articleRoute(app);
    loginManagerRoute(app);

    //未匹配到url转到404
    app.use(function(req,res){
        res.render('404');
    })

}

