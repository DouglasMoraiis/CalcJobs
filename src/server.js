const express = require('express')
const server = express()
const routes = require('./routes')
const path = require('path')

server.set('view engine', 'ejs')

// 
server.set('views', path.join(__dirname, 'views'));

//Enable statics files
server.use(express.static("public"))

//Usar o req.body 
server.use(express.urlencoded({extended: true}))

//routes
server.use(routes)

server.listen(3001, () => console.log('listening on'))
