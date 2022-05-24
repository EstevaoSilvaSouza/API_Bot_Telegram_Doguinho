/// PROMISSE.


const Mensagem = () => new Promise((resolve, reject) => {
    // throw new Error("falha")
    setTimeout(() => {
        resolve(['joao', 'maria'])
    }, 1000)
})


//Chamando a promisse e utiliazndo o Then no Resolver e catch no Reject!!
Mensagem().then(dado => console.log(dado))
    .catch(e => console.log(e))



// aync & await


//async significa que está criando uma promisse tbm, só que mais pratica a sinxtax Viu hehe

// o await é para AGUARDE ATÉ QUE ME DEVOLVA O QUE EU TO PEDINDO ENTendeu??? o await é para da um resolve em uma promise tbm hehe


// vamos par ao exemplo Zoooooooooooooooooooooooom..



const asyncSemAwait = async () => {
    return 123
}
//dessa forma ele já resolve a promisse de uma vez e retorna os dados..!! sem utilizar o await acontece isso hehe
console.log(asyncSemAwait())

const asyncComAwait = async () => {
    const dado = await new Promise((resolve, reject) => { // PODERIA UTILIZAR O FETCH COMO EXEMPLO E RETORNA E LOGO APÓS UTILIZAR O THEN DO RESOLVE PARA PEGAR O RESULTADO E ARMAZENA NA STATE
        setTimeout(() => {
            resolve('Joanzinho')
        }, 2000)
    })

    return dado

}

asyncComAwait().then(streamData => console.log(streamData))

