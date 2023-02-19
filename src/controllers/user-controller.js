const { response }= require('express');
const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req, res)=>{
    try {
        const response = await userService.create({
            email: req.body.email,
            password:req.body.password
        });
        return res.status(201).json({
          data: response,
          success:true,
          err:{},
          message : 'successfully created a new user'  
        })
    } catch (error) {
        console.log('something went wrong');
        return res.status(500).json({
            message: 'not able to create user',
            data :{},
            err : error,
            success:false 
        })
    }
}

module.exports = {
    create
}