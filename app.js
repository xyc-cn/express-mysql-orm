
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


