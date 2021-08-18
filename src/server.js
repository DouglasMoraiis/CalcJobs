const express = require('express')
const server = express()
const routes = require('./routes')

server.set('view engine', 'ejs')

//Enable statics files
server.use(express.static("public"))

//Usar o req.body 
server.use(express.urlencoded({extended: true}))

//routes
server.use(routes)

server.listen(3001, () => console.log('listening on'))
