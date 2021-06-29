/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/profile', (req,res)=>{
    res.sendFile( 'user.html' , {root: './public'});
  })

  router.get('/post', (req,res)=>{
    res.sendFile( 'create_listing.html', {root: './public'});
  })

  router.get('/listings', (req, res) => {
    res.sendFile('listing.html',{root: './public'});
  })

  router.get('/inbox', (req, res) => {
    res.sendFile('./inbox.html', {root:'./public'});
  })


  return router;
};
