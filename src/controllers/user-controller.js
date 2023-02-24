// const { response }= require('express');
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

const get = async (req, res)=>{
    try {
        const user = await userService.get(req.params.id);
        return res.status(200).json({
            data: user,
            success:true,
            err:{},
            message : 'successfully fetched a user'
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

const signIn = async(req, res)=>{
    try {
        const response = await userService.signIn(req.body.email , req.body.password );
        return res.status(200).json({
            data: response,
            err:{},
            message:'successfully signed in',
            sucess:true
        });
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
    create,
    get,
    signIn
}