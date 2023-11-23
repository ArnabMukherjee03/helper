require('dotenv').config();
const express = require("express");
const server = require('./src/app');
const {connection} = require('./src/database/dbConfig');
const { initializeSocket } = require('./src/utils/socket');
const port = process.env.PORT;

//* DataBase Connection
connection();

console.log(__dirname)

// Your code
if (process.env.NODE_ENV === "production") {
    const path = require("path");
    server.use(express.static(path.resolve(__dirname, 'build')));
    server.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'),function (err) {
            if(err) {
                res.status(500).send(err)
            }
        });
    })
}
// Your code



//* Server side Port
 const socket = server.listen(port,()=>{
    console.log(`Server Running at ${port}`);
})

initializeSocket(socket);
