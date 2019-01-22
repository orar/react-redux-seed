
const productionConfig = require('./config/webpack.prod.config.js');
const developmentConfig = require('./config/webpack.dev.config.js');

// process.env.npm_lifecycle_event === "production";
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  module.exports = productionConfig;
} else {
  module.exports = developmentConfig;
}
