// chamar o express para pega a funcao de Router não funciona utilizando a instancia do msm..
const express = require('express')
const route = express.Router()
const cors = require('cors')
//pegar as controllers
const api = require('../controllers/entregaController')

route.get('/', api.VerificaJwt, api.getAll)
route.post('/sendmessage', api.VerificaJwt, api.setUser)
route.post('/login', cors(), api.login)
route.post('/createUser', api.loginCreate)
route.get('/listUsers', api.VerificaJwt, api.listUsers)

module.exports = route