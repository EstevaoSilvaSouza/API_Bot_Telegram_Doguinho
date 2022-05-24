const mongoose = require('mongoose');

exports.modelEntrega = mongoose.model('delivery', {
    Nome: String,
    Telefone: String,
    Mensagem: [],
    Produto: String,
    Endereco: String,
    Status: Boolean,
    IdUser: String,
})