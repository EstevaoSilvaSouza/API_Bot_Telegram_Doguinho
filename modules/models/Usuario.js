const db = require('mongoose')

//criar o modelo...

exports.Usuario = db.model('Usuario', {
    Nome: String,
    Usuario: String,
    Senha: String,
    Cargo: String,
    Acesso: String
})