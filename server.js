const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Users = require('./models/users');

const app = express();

mongoose.connect('mongodb://admin:admin123@ds111895.mlab.com:11895/cosmetic-place',
    {useNewUrlParser: true},
    (err) => {
        if(err) return console.log(err);
        console.log('__[ HAVE CONNECTED TO MONGO_DB ]__');
    } 
);  

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use('/assets/', express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/protected', (req, res) => {
   res.render('protected');
});

app.post('/login', async(req, res) => {
    const {name, password} = req.body;

    console.log(req.body);
    const user = await new Users(req.body).save();

    res.redirect('/protected');
});

app.get('/admin', async(req, res) => {
    const {name, password} = req.query;

    if(name === 'admin' && password === 'zxcvbnqwerty7777kdadmdbdid') {
        
        const users = await Users.find({});

        res.render('admin', {users});

    } else {
        res.redirect('/');
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('__[ SERVER HAVE BEEN STARTING ]__'));