const express = require('express');
const User = require('../models/user');
const path = require('path');
const fs = require('fs');

//render profile page
module.exports.profile = (req, res) => {
  return res.render('user_profile', {
    title: 'Profile',
    profile_user: req.user,
  });
};

// updates user details
module.exports.update = async function (req, res) {
  try {
    const user = await User.findById(req.user.id);
    const { username, password, confirm_password } = req.body;

    if (password != confirm_password) {
      //req.flash("error", "New password and Confirm password are not same!");
      return res.redirect("back");
    }

    if (!user) {
      //req.flash("error", "User does not exist!");
      return res.redirect("back");
    }

    user.username = username;
    user.password = password;

    user.save();
    //req.flash("success", "profile updated!");
    return res.redirect("back");
  } catch (err) {
    //req.flash("error", err);
    console.log(err);
    return res.redirect("back");
  }
};


//render the singin page
module.exports.signin = function(req, res) {

  if(req.isAuthenticated()){
    return res.redirect('/dashboard');
  }

  return res.render('signin');
}


//render the signup page
module.exports.signup = function(req, res){

  if(req.isAuthenticated()){
    return res.redirect('/dashboard');
  }
  
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

//login and create session for the user
module.exports.createSession = (req, res) => {
  return res.redirect('/dashboard');
}

//logout
module.exports.destroySession = (req, res) => {
  req.logout((err) => {
    if(err) { return next(err);}
    res.redirect('/');
  })
}



