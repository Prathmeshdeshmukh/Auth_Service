const express = require('express');
const app = express();
const ApiRoutes = require('./routes/index');
const { PORT } = require('./config/serverConfig');
const bodyParser = require('body-parser');
const bycrpt = require('bcrypt');

const db = require('./models/index');
const {User , Role} = require('./models/index')


const setupAndStartServer = () =>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))
    app.use('/api', ApiRoutes);


    app.listen(PORT , async ()=>{
        console.log("Server started on PORT" , PORT);
         
        // if(process.env.DB_SYNC){
        //     db.sequelize.sync({alter : true});
        // }

        // const user1 = await User.findByPk(2);
        // const role1 = await Role.findByPk(2);

        // user1.addRole(role1);
    })
}

setupAndStartServer();