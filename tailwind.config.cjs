const { resolve } = require('path');
require('ts-node').register();
module.exports = require(resolve(__dirname, 'tailwind.config.ts')).default;