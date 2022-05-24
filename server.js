const app = require('./index')
const mongo = require('./index')
const port = process.env.PORT || parseInt(3030)


//Chama o bot criado!
const bot = require('./modules/controllers/telegramController')

//iniciar o express 

const server = app.app.listen(port, () => {
    console.log(String(`[API] Servidor online
        connect: http://127.0.0.1:${port}/
    `))
    bot.bot
})

mongo.mongoose.connect(StringConnectionDatabaseMongoose)
    .then(server)
    .catch(erro => console.log(erro))

process.on('SIGINT', () => {
    server.close()
    console.log(String(`Finalizado servidor`))
})


