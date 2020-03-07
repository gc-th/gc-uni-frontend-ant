const { override, fixBabelImports, addLessLoader } = require('customize-cra')
const VariablesOutput = require('less-plugin-variables-output');
const fs = require('fs');
const path = require('path');
const less = require('less');

const themeLessFileName = path.resolve(path.join(__dirname, 'src', 'theme.less'));
const lessContent = fs.readFileSync(themeLessFileName, 'utf8');
let lessOverrides = {};

const lessPluginOptions = {
  callback: (vars) => lessOverrides = vars
};

less.render (lessContent, {
  plugins: [
    new VariablesOutput(lessPluginOptions)
  ]
}, (error, output) => {
  if (error) {
    throw new Error('Error occured during the parsing of the theme.less file: ' + error);
    return config;
  }
});

module.exports = override( fixBabelImports('import', {
  libraryName: 'antd',
  libraryDirectory: 'es',
  style: true,
  }),
  
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: lessOverrides
  }),
)
