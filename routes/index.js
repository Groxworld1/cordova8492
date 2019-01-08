var express = require('express');
var router = express.Router();

let mysql = require('mysql');
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "bunis",
  password: ""
});

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


router.use(passport.initialize());

passport.use(new FacebookStrategy({
  clientID: '1204907779634234',
  clientSecret: '8d52555d33e611223bdc8e3b1faedb77',
  enableProof: true,
  callbackURL: 'https://cordova8492.herokuapp.com/auth/facebook/done',
  profileFields: ['id', 'displayName', 'photos', 'email']
}, function (accessToken, refreshToken, profile, next) {
  return next(null, profile);
}));

passport.serializeUser(function (user, next) {
  return next(null, user);
});

passport.deserializeUser(function (user, next) {
  return next(null, user);
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/done', passport.authenticate('facebook', { failureRedirect: '/' })
  , function (req, res) {
    let username = req.body.username;
    let fbID = req.body.fbID;
    let password = req.body.password;

    let query = "INSERT INTO users(fbID, username, password) VALUES(?, ?, ?)"
    let params = [fbID, username, password];

    connection.query(query, params, function(err, results){
      if(err){
        res.json({msg: "Query Error UwU"})
        throw err;
      }

      return res.redirect("/home")
    });

    let userData = {
      facebook_id: '10212735855619379',
      displayName: req.user.displayName
    };

    userData = JSON.stringify(userData);
    
    return res.redirect('/home?userData=' + userData);
  });

  router.post('/doRegister', function(req, res){
    let username = req.body.username;
    let fbID = req.body.fbID;
    let password = req.body.password;
  
    let query = "INSERT INTO users(fbID, username, password) VALUES(?, ?, ?)"
    let params = [fbID, username, password];
  
    connection.query(query, params, function(err, results){
      if(err){
        res.json({msg: "Query Error"})
        throw err;
      }
  
      return res.redirect('/home');
    })
  })

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: "Express"});
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/detail', function (req, res, next) {
  res.render('detail');
});

router.get('/home', function (req, res, next) {
  res.render('home');
});

router.get('/mylist', function (req, res, next) {
  res.render('mylist');
});

module.exports = router;
