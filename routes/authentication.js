const path = require('path');
const express = require('express');
const dbParams = require('../lib/db');
const router  = express.Router();
/* const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session'); */

const {getUserWithEmail, addUser, getUser} = require('./database');

//res.sendFile('index.html', { root: __dirname });

module.exports = (db) =>  {
  router.get("/register", (req, res) => {
    res.sendFile( 'register.html' , {root: './public'});
  });

  router.post("/register", (req, res) => {
    console.log(req.body);
    //fetches details of users if matching email is found
    getUserWithEmail(db, req.body.email).then((user) => {
      if (user.rows[0]) {
         res.redirect("/login");
      } else {
        const userDetails = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          phone_number: req.body.phone_number,
          city: req.body.city,
          province: req.body.province
        }
        //add user if userid do not exists in our database
        addUser(db, userDetails).then((user) => {
          req.session["user_id"] = user.rows[0].id;
         res.redirect("/");
        });
      }

    });
  });

  router.get("/login", (req,res)=>{
    res.sendFile( 'login.html' , {root: './public'});
  })

  router.post("/login", (req,res) => {
    const user = {
       email: req.body.email,
       password: req.body.password
    }
    //check if credentials match or not
    getUser(db,user)
    .then((user)=>{
      //check if it has some value
      console.log(user.rows[0]);
      if(!user.rows[0])
      {
        return res.send("credentials do not match, please try again");
      }

      if(req.body.email !== user.rows[0].email || req.body.password !== user.rows[0].password)
      {
        return res.send("credentials do not match");
      }
        req.session["user_id"] = user.rows[0].id;
        return res.redirect("/");
    })
  })

  router.get('/logout', (req,res) => {
   req.session["user_id"] = null ;
    res.redirect('/');
  })



  return router;
}
