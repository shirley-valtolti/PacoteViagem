import express from "express";
import autenticar from "./seguranca/autenticar.js";
import session from "express-session";
import Cliente from "./Model/cliente.js";

const porta = 3000;
const localhost = "0.0.0.0"; //define nosso aplicativo estará disponível em todas as interfaces de redes deste computador

const app = express();

//configurar como o express irá processar os parâmetros do formulário
app.use(express.urlencoded({extended: true})); //biblioteca QS /QueryString

app.use(session({
    secret: "m1Nh4Ch4v3S3cR3t4", //variáveis de ambiente
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 15 //15 minutos de sessão
    }
}));

//o HTTP é um protocolo stateless (sem estabelecimento de sessão)
//o servidor recebe uma requisição, processa a requisição e envia uma resposta
//sem se preocupar em identificar os atores envolvidos

//Com o auxílio da biblioteca express-session
//Vamos implementar a habilidade de estabelecer uma sessão 
//para um determinado usuário


//oferecer o recurso login
app.get("/login", (requisicao, resposta) => {
    resposta.redirect('/login.html');
})

app.post("/login",(requisicao, resposta) => {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario === "admin" && senha === "admin") {
        requisicao.session.autenticado = true;
        resposta.redirect('/menu.html');
    } else {
        resposta.redirect('/login.html');
    }
});

app.get("/logout", (requisicao, resposta) => {
    requisicao.session.destroy();
    resposta.redirect('/login.html');
})

//prepara o servidor para disponibilizar recursos estáticos
//erro: http://localhost:3000/publico/index.html
//certo: http://localhost:3000/index.html
app.use(express.static("./publico"));

//disponibilizando os arquivos da pasta privada
//a função autenticar se comporta como um middleware (atua na camada do meio)
app.use(autenticar, express.static("./privado"));


app.listen(porta, localhost, () => {
    console.log(`Servidor rodando em http://${localhost}:${porta}`);
});

/*
var cliente = new Cliente("111.111.111-11", 
    "Renato Gonçalves", 
    "Rua 1",
    "Bairro 1",
    "Cidade 1",
    "SP",
    "(11) 1111-1111",
    "2eH3y@example.com");

//salvar o cliente no banco de dados
cliente.gravar().then(() => {
    console.log("Cliente gravado com sucesso!");
}).catch((erro) => {
    console.log("Erro ao gravar o cliente: " + erro);
});

//alterar o cliente no banco de dados
cliente.alterar().then(() => {
    console.log("Cliente alterado com sucesso!");
}).catch((erro) => {
    console.log("Erro ao alterar o cliente: " + erro);
});

//excluir o cliente no banco de dados
cliente.excluir().then(() => {
    console.log("Cliente excluido com sucesso!");
}).catch((erro) => {
    console.log("Erro ao excluir o cliente: " + erro);
});

//recuperação da informação a partir do banco de dados
cliente.consultar().then((listaClientes) => {
    for (const cliente of listaClientes) {
        console.log(cliente.toJSON());
    }
});
*/