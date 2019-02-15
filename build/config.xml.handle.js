const fs = require('fs');
const FILE_PATH = 'dist/config.xml';

let dev_conf_data = fs.readFileSync(FILE_PATH, 'utf8');
let prod_conf_data = dev_conf_data.replace(/http:\/\/.*:8888\/index.html/, 'index.html');
fs.writeFileSync(FILE_PATH, prod_conf_data);
console.log('\033[42;30m DONE \033[40;32m ( •̀ ω •́ )y  构建完成 \033[5m');