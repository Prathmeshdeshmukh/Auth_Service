const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class UserService{
    constructor(){
        this.UserRepository = new UserRepository();
    }

    async create(data){
        try {
           const user = await this.UserRepository.create(data);
           return user; 
        } catch (error) {
            console.log("something went wrong in service layer");
            throw error;
        }
    }

    async destroy(userId){
        try {
           await this.UserRepository.destroy({
            where:{
                id:userId
            }
           });
           return true; 
        } catch (error) {
            console.log("something went wrong in service layer");
            throw error;
        }
    }

    async get(userId){
        try {
            const user = await this.UserRepository.findByPk(userId , {
                attributes :['email' , 'id']
            });
            return user;
        } catch (error) {
            console.log('something went wrong in servuce layer')
            throw error;
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user , JWT_KEY ,{ expiresIn: '1h'});
            return result;
        } catch (error) {
            console.log('something went wrog in token creation');
            throwerror;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token , JWT_KEY);
            return response;
        } catch (error) {
            console.log('something went wrog in token creation');
            throwerror;
        }
    }

    checkPassword(userInputPlainPassword , encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword ,encryptedPassword)
            
        } catch (error) {
            console.log('something went wrong in password comparison');
            throw error;
            
        }
    }
}

module.exports = UserService;