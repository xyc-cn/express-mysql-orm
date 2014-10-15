/**
 * Created by Administrator on 14-7-22.
 */
var node_env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
var config = require('../config/config')[node_env];
var Sequelize = require("sequelize");
var dbStroage = new Sequelize(config.database, config.username, config.password, config.option);
module.exports = dbStroage;