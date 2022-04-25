const app = require('./app');

const {APP_PORT} = require('../config/config.default.js');

app.listen(APP_PORT,()=>{
    console.log(`server is run http://localhost:${APP_PORT}`);
})