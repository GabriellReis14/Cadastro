const config = require("./config/config");
const path = require('path')
const fs = require('fs');
const app = config();
const portHttp = 3529;
const portHttps = 3530;
const http = require('http');
const https = require('https');
const cert = fs.readFileSync(path.join(__dirname, './server/cert.crt'),'utf8');
const key = fs.readFileSync(path.join(__dirname, './server/privatekey.key'),'utf8');


const options = {
    key,
    cert
}

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

httpServer.listen(portHttp, () => console.log(`API executando na porta ${portHttp}`) )
httpsServer.listen(portHttps, () => console.log(`API executando na porta ${portHttps}`));