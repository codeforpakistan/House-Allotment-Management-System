
//aurthor : farrukh askari
//help was taaken from blog at codeforgeek.com
//code taken and modified from github account : codeforgeek
//twitter : @codeforgeek
// Update: 01 Jan 2016
var express     = require("express");
var mysql       = require("mysql");
var bodyParser  = require("body-parser");
var md5         = require('MD5');
var rest        = require("./REST.js");
var app         = express();
var url = require('url');
require('dotenv').config();
function REST()
{
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function()
{
    var self = this;
    var pool = mysql.createPool(
    {
        connectionLimit : 100,
        host     : process.env.host,
        port     : process.env.dbPort,
        user     : process.env.user,
        password : process.env.password,
        database : process.env.database,
        debug    :  false
    });

    pool.getConnection(function(err,connection)
    {
        if(err)
        {
            self.stop(err);
        }
        else
        {
            self.configureExpress(connection);
        }
    });
};


REST.prototype.configureExpress = function(connection)
{
    var self = this;
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    var router = express.Router();
	
	app.use(express.static(__dirname + '/public'));
    app.use('/public/index.html', router);
    app.use('/api', router);

    var rest_router = new rest(router, connection, md5);
    self.startServer();
};


REST.prototype.startServer = function()
{
    app.listen(process.env.port, function()
    {
      console.log("All right ! I am alive at Port " + process.env.port);
    });
};

REST.prototype.stop = function(err)
{
    console.log("ISSUE WITH MYSQL \n" + err);
    process.exit(1);
};

new REST();
