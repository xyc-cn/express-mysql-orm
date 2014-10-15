
/*
 * GET home page.
 */
module.exports = {
        checkLogin:checkLogin
}

    function checkLogin(req, res, next) {
        if (!req.session.user) {
            req.flash('error', '未登录!');
            res.redirect('/login');
        }
        next();
    }





