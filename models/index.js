/**
 * Startup
 * @module database
 * @requires fs
 * @requires path
 * @requires sequelize
*/

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const db = {};

/**
* @typedef ModelInit
* @property {object} {object} db - Array of Sequelize associated models
*/

/**
 * Setting up database connection and models
 * @memberOf module:database
   @returns {ModelInit.model}
 */

var sequelize = new Sequelize(
  global.config.database.databasename,
  global.config.database.user,
  global.config.database.password ? global.config.database.password : null, {
    host: global.config.database.host ? global.config.database.host : 'localhost',
    port: global.config.database.port ? global.config.database.port : 3306,
    logging: false,
    define: {
      timestamps: false,
      freezeTableName: true
    },
    dialect: global.config.database.dialect
  });
fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  }).forEach(function(file) {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;