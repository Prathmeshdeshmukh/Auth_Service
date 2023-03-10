const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
           const user = await this.userRepository.create(data);
           return user; 
        } catch (error) {
            console.log("something went wrong in service layer");
            throw error;
        }
    }

    async destroy(userId){
        try {
           await this.userRepository.destroy({
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
            const user = await this.userRepository.findByPk(userId , {
                attributes :['email' , 'id']
            });
            return user;
        } catch (error) {
            console.log('something went wrong in servuce layer')
            throw error;
        }
    }

    async signIn(email , plainPassword){
        try {
            const user = await this.userRepository.getByEmail(email);
            const passwordMatch = this.checkPassword(plainPassword , user.password);
            if(!passwordMatch){
                console.log('Password doesnt match');
                throw {error : 'Incorrect Password'}
            }
            const newJWT = this.createToken({email: user.email , id:user.id});
            return newJWT;
        } catch (error) {
            console.log('something went wrong in sign in process');
            throw error;
            
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw{error: 'invalid token'}
            }

            const user = this.userRepository.getById(response.id);
            if(!user){
                throw{error: 'no user with corresponding token exist'}
            }
            return user.id;

        } catch (error) {
            console.log('something went wrong in authentication process');
            throw error;
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user , JWT_KEY ,{ expiresIn: '1d'});
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

    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log('something went wrong in isadmin checking');
            throw {error};
        }
    }

}

module.exports = UserService;