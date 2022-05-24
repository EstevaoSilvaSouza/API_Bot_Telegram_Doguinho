const telegramBot = require('node-telegram-bot-api')
const token = "SuaKeyAquiMennn"
const bot = new telegramBot(token, { polling: true })
const modelDb = require('../models/entrega')
const { v4: uuid } = require('uuid')
let status = 'false'
let endereco = ''



const sendMessages = (objUser) => {
    try {
        bot.sendMessage(objUser.IdUser, objUser.Mensagem)
    }
    catch (e) {
        console.log(`Erro ao enviar o dado!! `, e)
    }
}

bot.on('message', async (msg) => {
    //verificar ser o cara tem usuario cadastradao!!!
    const findUser = await modelDb.modelEntrega.findOne({ IdUser: msg.chat.id })

    if (findUser) {
        findUser.Mensagem.push({ Nome: findUser.Nome, Texto: msg.text, foto: msg.chat.photo, DateEnviado: new Date(), IdMessage: uuid() })

        console.log('adicionado ', findUser)
        await modelDb.modelEntrega.updateOne({ IdUser: msg.chat.id }, findUser)
    }

})

bot.onText(/\/start/, async (msg) => {
    status = 'false'

    //verifica se tem cadastro!!
    const findOne = await modelDb.modelEntrega.findOne({ IdUser: msg.chat.id })
    if (findOne) {
        bot.sendMessage(msg.chat.id, 'Usuario cadastrado!')
    }
    else {
        bot.sendMessage(msg.chat.id, `Bem vindo - ${msg.from.first_name} ao ChatBot DoguinhoBot 🐶🐶😘
     -- Lista de Comandos --
        /ajuda
        /editar
        www.dogbot.br

    `)
        bot.on('message', (msg) => {
            const chatId = msg.chat.id

            const objUser = {
                Nome: msg.from.first_name,
                Telefone: 'null',
                Mensagem: [],
                Produto: 'null',
                Endereco: 'null',
                Status: false,
                IdUser: msg.chat.id
            }



            if (msg.text.toString().toLowerCase().includes("ola")) {
                bot.sendMessage(chatId, ` Olá sou DoguinhoBot!! 👾 
            por favor informe o endereco:
            `)
            }
            if (msg.text.toString().toLowerCase().length > 7 && status !== 'true') {
                bot.sendMessage(chatId, `Entendi seu endereço é ${msg.text}`, {

                    "reply_markup": {
                        "keyboard": [["Sim", "Não"]]
                    }
                })
                endereco = msg.text
                status = 'true'

            }

            if (msg.text.toString().toLowerCase().includes('sim')) {

                modelDb.modelEntrega.create({ ...objUser, ['Endereco']: endereco })
                bot.sendMessage(chatId, ` Cadastrado com sucesso!! - pode interagir com o bot e aguardar o suporte.!`)

            }

        })
    }
}
)
bot.onText(/\/ajuda/, (msg) => {
    bot.sendMessage(msg.chat.id, `Bem vindo - ${msg.from.first_name} ao ChatBot DoguinhoBot 🐶🐶😘
     -- Help Doguinho --
    Telefone: 16 999999999
    website: www.dogibot.br

    `)
}
)


const sendData = (obj) => {
    return obj
}

module.exports = { bot, sendData, sendMessages }