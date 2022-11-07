const express = require('express');
const User = require('../models/user');
const path = require('path');
const fs = require('fs');


//render the singin page
module.exports.signin = function(req, res) {

  if(req.isAuthenticated()){
    return res.redirect('/user/home');
  }

  return res.render('signin');
}


//render the signup page
module.exports.signup = function(req, res){
  
  return res.render('signup');
}

//get the sign up data
module.exports.create = async function(req, res){
  try{
    if(req.body.password != req.body.confirm_password){
      return res.redirect('back');
    }
    let user = await User.findOne({email: req.body.email});

    if(!user){
      await User.create(req.body);
      return res.redirect('/');
    }else{
      return res.redirect('back');
    }
  }
  catch(err){
    console.log('Error in sign-up', err);
  }
}

