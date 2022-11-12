const env = require('./environment');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  app.locals.assetPath = function(filePath) {
    if(env.name == 'developement'){
      console.log("Filepath" , filePath);
      return filePath;
    }

    return '/' + JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath];
  }
}