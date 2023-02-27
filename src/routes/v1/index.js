const express = require('express');
const UserController = require('../../controllers/user-controller');
const {authReqValidate} = require('../../middlewares/index');

const router =  express.Router();

router.post('/signup' , UserController.create );
router.post('/signin' ,
 authReqValidate.validateUserAuth
 ,  UserController.signIn );

 router.get('/isAuthenticated' , UserController.isAuthenticated);
 
router.get('/user/:id' , UserController.get);

router.get('/isAdmin', UserController.isAdmin);

module.exports = router;