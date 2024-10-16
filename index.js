const fs = require('fs');
const path = require('path');
var cors = require('cors'); // 引入cors中间件
 
// 引入api路由配置文件
const api = require('./config/api');
 
// body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据
const bodyParser = require('body-parser');
 
// 引入express包
const express = require('express');
 
// 创建web服务器
const app = express();

app.use(cors({
    origin: ['http://localhost:8080',"http://127.0.0.1:5173","http://localhost:5173"], // 允许的来源
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的方法
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'] // 允许的请求头
}));

app.use(bodyParser.json({ limit: '50mb' })); // 增加请求体大小限制

app.use(bodyParser.urlencoded({extended: false}));


 
// 后端api路由
app.use('/api', api);
 
// 监听端口
app.listen(3000);
// 在终端打印信息
console.log('success listen at port: 3000......');
