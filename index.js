const winston = require('winston')
const mongoose = require('mongoose')
const express = require('express');
const app = express();
var cors = require('cors')
const upload = require('express-fileupload')
require('./protection')(app)
require('express-async-errors')
require('winston-mongodb')
let port =process.env.PORT || 9000
// 127.0.0.1:27017
//var server_port = process.env.YOUR_PORT || process.env.PORT || 27017;
//var server_host = process.env.YOUR_HOST || '127.0.0.1:27017';

//////////////////////////////////////// FOR USERS Admin account ////////////////////////////////////

const admin_get = require('./routes/admin/Admin_get');
const admin_del = require('./routes/admin/Admin_delete');
const admin_post = require('./routes/admin/Admin_post');
const admin_put = require('./routes/admin/Admin_put');

//////////////////////////////////////// FOR USERS Business account ////////////////////////////////

const Business_post = require('./routes/business/Business_post');
const Business_put = require('./routes/business/Business_put');

//////////////////////////////////////// FOR LOGIN-REGISTER //////////////////////////////////////// 

const Register = require('./routes/register_user')
const Login = require('./routes/login_user')

//////////////////////////////////////// FOR POSTS ///////////////////////////////////// ////////////

const addpost = require('./routes/posts-routes/Addpost')
const getpost = require('./routes/posts-routes/getpost')

//////////////////////////////////////// FOR POSTS images///////////////////////////////////// ////////////
const postimg = require('./routes/posts-routes/restaurant_img/postimg')
const getimg = require('./routes/posts-routes/restaurant_img/getimg')

const check = require('./routes/check')

app.use(upload())
app.use(cors())
app.use(express.json())

//////////////////////////////////////// FOR Admin USERS Routes ////////////////////////////////// 

app.use('/api/get', admin_get);
app.use('/api/del', admin_del);
app.use('/api/post', admin_post);
app.use('/api/put', admin_put);

//////////////////////////////////////// FOR Business USERS Routes /////////////////////////////////

app.use('/api/business_post', Business_post);
app.use('/api/business_put', Business_put);

//////////////////////////////////////// FOR Login/Registation Routes //////////////////////////////

app.use('/api/register',Register );
app.use('/api/login',Login );

//////////////////////////////////////// FOR POSTS Routes //////////////////////////////////////////

app.use('/api/addpost', addpost);
app.use('/api/getpost', getpost);


app.use('/api/upload',postimg)
app.use('/api/getimg',getimg)


app.use('/api/check',check)
/////////////////////////////////////////////////////////////////////////////////////////////////////

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/Restaurantappdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('Database connected'))
.catch(err => console.log('Error', err))


winston.add(new winston.transports.File({
    filename: 'logfile.log'
}))
winston.add(new winston.transports.MongoDB({
    db: process.env.MONGODB_URL ||'mongodb://localhost/logindb'
}))



app.listen(port, function() {
    console.log(`Listening on port ${port}` );
});