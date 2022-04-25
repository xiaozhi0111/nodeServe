const Koa = require('koa');

const {APP_PORT} = require('../config/config.default.js');

const userRouter = require('./router/user.route');

const app = new Koa();

app.use(userRouter.routes());

app.listen(APP_PORT,()=>{
    console.log(`server is run http:localhost:${APP_PORT}`);
})