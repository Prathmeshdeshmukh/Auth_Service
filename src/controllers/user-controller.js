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

const isAuthenticated = async (req, res)=>{
    try {
        const token =  req.header("x-access-token");
        // const isverified = userService.verifyToken(token);
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: response,
            sucess: true,
            err:{},
            message:"user is authenticated and token is valid"

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

const isAdmin = async (req , res)=>{
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            err:{},
            success:true,
            message : "successfully fetched whether user is admin or not"
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
    create,
    get,
    signIn,
    isAuthenticated,
    isAdmin
}