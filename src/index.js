const express = require('express');
const app = express();
const ApiRoutes = require('./routes/index');
const { PORT } = require('./config/serverConfig');
const bodyParser = require('body-parser');

const {User} = require('./models/index');
const bycrpt = require('bcrypt');


const setupAndStartServer = () =>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))
    app.use('/api', ApiRoutes);


    app.listen(PORT , async ()=>{
        console.log("Server started on PORT" , PORT);
        // const incomingpassword ='deshmukh2222';
        // const user = await User.findByPk(3);
        // const response = bycrpt.compareSync(incomingpassword , user.password);
        // console.log(response);  
    })
}

setupAndStartServer();