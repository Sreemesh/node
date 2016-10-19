var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var path = require('path');

var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var url = "mongodb://sree:sree@ds059516.mlab.com:59516/userdetails";

var user1, user2, pwrd, uc, useral, pwrd1, pwrd2, pass2, uc2, d1, d2, d3, d4, d5;

app.post('/login', function(req, res) {
    user1 = req.body.user;
    pass2 = req.body.pass;
    uc.find({
        username: user1
    }).toArray(function(err, docs) {
        if (docs.length == 0 && user1 != null && pass2 != null) {
            uc.insert({
                username: user1,
                password: pass2
            });
            res.sendFile(__dirname + '/home.html');
        } else if (docs.length != 0) {
            console.log("user name already exists!!!");
            res.sendFile(__dirname + '/signup.html');
        }
    })
    pwrd1 = req.body.pass1;
    pwrd2 = req.body.pass2;
    console.log(pwrd1)
    if (pwrd1 == pwrd2) {
        uc.update({
            username: useral
        }, {
            $set: {
                password: pwrd1
            }
        }, {
            multi: true
        });
        res.sendFile(__dirname + '/login.html');
    } else {
        console.log("Password mismatch");
        res.sendFile(__dirname + '/changepass.html');
    }
});

app.post('/home2', function(req, res) {
    user2 = req.body.loguser;
    pwrd = req.body.logpass;
    uc.find({
        username: user2,
        password: pwrd
    }).toArray(function(err, docs) {
        if (docs.length == 0) {
            console.log("Login details incorrect");
            res.sendFile(__dirname + '/login.html');
        } else {
            res.sendFile(__dirname + '/home2.html');
        }
    })
    d1 = req.body.title;
    d2 = req.body.date;
    d3 = req.body.auth;
    d4 = req.body.url;
    d5 = req.body.cntnt;
    if (d1 && d2 && d3 && d4 && d5) {
        uc2.insert({
            title: d1,
            doc: d2,
            an: d3,
            img: d4,
            note: d5
        });
        res.sendFile(__dirname + '/home2.html');
    } else {
        console.log("Enter all details")
    }



});
app.post('/changepass', function(req, res) {
    useral = req.body.gotuser;
    uc.find({
        username: useral
    }).toArray(function(err, docs) {
        if (docs.length == 0) {
            console.log("incorrect username");
            res.sendFile(__dirname + '/forgotpass.html');
        } else {
            res.sendFile(__dirname + '/changepass.html');
        }
    })
});



mongoClient.connect(url, function(err, db) {
    uc = db.collection('usernames');
    uc2 = db.collection('json');
})

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/home.html');
});
app.get('/home', function(req, res) {
    res.sendFile(__dirname + '/home.html');
});
app.get('/home2', function(req, res) {
    res.sendFile(__dirname + '/home2.html');
});
app.get('/forgotpass', function(req, res) {
    res.sendFile(__dirname + '/forgotpass.html');
});
app.get('/changepass', function(req, res) {
    res.sendFile(__dirname + '/changepass.html');
});
app.get('/signup', function(req, res) {
    res.sendFile(__dirname + '/signup.html');
});
app.get('/add', function(req, res) {
    res.sendFile(__dirname + '/add.html');
});
app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/login.html');
});

app.get('/getAllPosts', function(req, res) {

    uc2.find().toArray(function(err, docs) {
        var jsondata = docs;

        res.send(jsondata);
    })

});

app.listen(3030, function() {
    console.log('Connected to localhost:3030');
});