//Model..
const model = require('../models/entrega')
const modelUsuario = require('../models/Usuario')
const bot = require('./telegramController')
const jwt = require('jsonwebtoken')
const SECRETO = "h5An8nPV9BC&XCoPTrFTjMcURrQQdB&l3%C^id&%Xr6JtjVa1c"


//Função para verificar se a pessoa esta autenticada com um token valido!!
exports.VerificaJwt = (req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token) {
        return res.status(401).json({ auth: false, Mensagem: "Falha ao recebe token!!" })
    }
    jwt.verify(token, SECRETO, (err, decoded) => {
        if (err) {
            return res.status(500).json({ auth: false, Mensagem: "Token invalido!! não tente burlar" })
        }
        req.obj = decoded.obj
        next()
    })
}

//controller retorna notfound
exports.notFound = (req, res) => {
    try {
        res.json({ "MSG:": "Não existe esta rota!!" })
    }
    catch (e) {
        res.status(404).json({ "MSG": e })
    }
}

exports.loginCreate = (req, res) => {
    const { Nome, Usuario, Senha, Cargo, Acesso } = req.body

    const obj = { Nome, Usuario, Senha, Cargo, Acesso }

    modelUsuario.Usuario.create(obj)
        .then(() => res.status(200).json({ MSG: "Usuario cadastrado com sucesso!!" }))
        .catch((err) => res.status(404).json({ MSG: "Falha ao cadastrar o usuario!!", err }))
}

exports.listUsers = (req, res) => {
    modelUsuario.Usuario.find()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(404).json({ MSG: "Falha ao lista Users", err }))
}

exports.login = async (req, res) => {
    const { Usuario, Senha } = req.body
    const userCheck = await modelUsuario.Usuario.findOne({ Usuario: Usuario })
    if (userCheck) {
        if (userCheck.Acesso === "A") {
            if (Senha === userCheck.Senha) {
                const token = jwt.sign({ userCheck }, SECRETO, { expiresIn: 250 })
                return res.status(200).json({ auth: true, token: token })
            }
        }
    }
    return res.status(500).json({ auth: false, token: "Usuario ou senha invalido!!" })
}

//controller para pegar todos os dados do banco..
exports.getAll = async (req, res) => {
    try {
        const findAll = await model.modelEntrega.find();
        res.status(200).json(findAll)
    }
    catch (e) {
        res.status(400).json({ "MSG": "Falha ao processar.." })
        console.log("falha.!!", e)
    }
}

//controller para cadastrar assim que o cara integrarir com bot.
exports.setUser = (req, res) => {
    const { Nome, Telefone, Mensagem, Produto, Endereco, Status, IdUser
    } = req.body
    const obj = { Nome, Telefone, Mensagem, Produto, Endereco, Status, IdUser }

    try {
        console.log(obj)
        //await model.modelEntrega.deleteMany()
        bot.sendMessages(obj)
        res.status(200).json({ id: req.obj.id, user: req.obj.nome, "MSG": "Enviado com sucesso!!!" })
    }
    catch (e) {
        console.log(e)
    }
}