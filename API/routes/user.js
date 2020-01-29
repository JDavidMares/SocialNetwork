'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
//Middleware
var md_auth = require('../middlewares/authenticated');

api.get('/home',md_auth.ensureAuth , UserController.home);
api.post('/user/register',UserController.saveUser);
api.post('/login',UserController.login);
api.get('/user/:id',md_auth.ensureAuth, UserController.getUser);
api.get('/users/:page?',md_auth.ensureAuth, UserController.getUsers);

module.exports = api;
