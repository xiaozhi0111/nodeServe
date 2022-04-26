const path = require('path');

const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const parameter = require('koa-parameter');

const errHandler = require('./errHandler');

const router = require('../router');

const app = new Koa();

app.use(koaBody({           //参数处理插件
    multipart: true,
    formidable:{
        uploadDir: path.join(__dirname,'../upload'),
        keepExtensions: true
    }
}));

app.use(koaStatic(path.join(__dirname,'../upload')));       //静态资源处理插件

app.use(parameter(app));    //参数校验插件

app.use(router.routes());   //路由处理中间件
app.use(router.allowedMethods());   //路由方法校验

app.on('error',errHandler)

module.exports = app