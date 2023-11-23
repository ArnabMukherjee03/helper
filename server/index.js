require('dotenv').config();
const server = require('./src/app');
const {connection} = require('./src/database/dbConfig');
const { initializeSocket } = require('./src/utils/socket');
const port = process.env.PORT;

//* DataBase Connection
connection();


//* Server side Port
 const socket = server.listen(port,()=>{
    console.log(`Server Running at ${port}`);
})

initializeSocket(socket);
