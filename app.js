
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path')
var flash = require('connect-flash');;
var app = express();
var utils = require('./models/utils')
var ueditor = require('ueditor');
var MemStore = express.session.MemoryStore;
app.use(express.cookieParser('keyboard cat'));
app.use(express.session({ secret:"keyboard cat",
                            cookie: { maxAge: 3000000 },
                            store:new MemStore()}));
app.use(flash());
app.use(express.methodOverride());
app.use(express.bodyParser({ keepExtensions: true, uploadDir: './public/images' }));
app.set('port', process.env.PORT || 3800);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var allowCrossDomain = function(req, res, next) {
    // if the origin was not passed.
    var origin = (req.headers.origin || "*");

    console.log('origin:' + origin);

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Set-Cookie, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    if ("OPTIONS" == req.method) {
        res.send(200);
    } else {
        next();
    }

};
app.use(allowCrossDomain);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

ueditor(app,"/ueditor/ueditor.config.json","/",path.join(__dirname, 'public'),"/images")
app.get('/test',function(req,res){
    res.render('ueditor');
})
utils.Dateformat;
var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
routes(app);


