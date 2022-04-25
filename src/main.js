const Koa = require('koa');

const {APP_PORT} = require('../config/config.default.js');

const app = new Koa();

// app.get('/',(ctx,next)=>{
//     ctx.body = 'hello'
// })

app.listen(APP_PORT,()=>{
    console.log(`server is run http:localhost:${APP_PORT}`);
})