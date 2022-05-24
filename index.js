//Chamar os modules do express API
const express = require('express')
const app = express()

//liberar outras ferramentas a utlizar api
const cors = require('cors')

//Chamar os module do mongoose
const mongoose = require('mongoose')

//criar Middleware para as routas..
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//criar rota para redicionar pra o arquivo de routers na pasta Routers..
const routers = require('./modules/routers/routers')
app.use(('/'), cors(), routers)

module.exports = { app, mongoose }



