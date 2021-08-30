const winston = require('winston')
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const auth = require('./routes/auth');
const users1 = require('./routes/users1');
const admin_get = require('./routes/admin/get');
const admin_del = require('./routes/admin/del');
const admin_post = require('./routes/admin/post');
const admin_put = require('./routes/admin/put');
const Business_post = require('./routes/business/post');
const Business_put = require('./routes/business/put');
const User = require('./models/register')
require('./protection')(app)
require('express-async-errors')
require('winston-mongodb')

app.use(express.json())
app.use('/api/auth', auth);
app.use('/api/users', users1);
app.use('/api/get', admin_get);
app.use('/api/del', admin_del);
app.use('/api/post', admin_post);
app.use('/api/put', admin_put);
app.use('/api/business_post', Business_post);
app.use('/api/business_put', Business_put);



mongoose.connect('mongodb://localhost/Restaurantappdb', {
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
    db: 'mongodb://localhost/logindb'
}))


app.listen(9000, () => {
    console.log('running...')
});