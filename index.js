import express from "express";
import session from "express-session";
import autenticar from "./seguranca/autenticar.js";
import ClienteDB from "./Database/clienteDB.js";
import Cliente from "./Model/cliente.js";
import cors from "cors";
import bodyParser from "body-parser";

const porta = 3002;
const localhost = "0.0.0.0";

const app = express();
const clienteDB = new ClienteDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(
    session({
        secret: "m1Nh4Ch4v3S3cR3t4",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 15,
        },
    })
);

app.get("/login", (requisicao, resposta) => {
    resposta.redirect("/login.html");
});

app.post("/login", (requisicao, resposta) => {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario === "admin" && senha === "admin") {
        requisicao.session.autenticado = true;
        resposta.redirect("/menu.html");
    } else {
        resposta.redirect("/login.html");
    }
});

app.get("/logout", (requisicao, resposta) => {
    requisicao.session.destroy();
    resposta.redirect("/login.html");
});

app.use(express.static("./publico"));
app.use(autenticar, express.static("./privado"));

app.post("/api/clientes", async (req, res) => {
    try {
        const {
            cpf,
            nome,
            endereco,
            bairro,
            cidade,
            uf,
            telefone,
            email
        } = req.body;

        if (!cpf || !nome || !email) {
            return res.status(400).json({
                error: "CPF, Nome e Email são obrigatórios!"
            });
        }

        const novoCliente = new Cliente(cpf, nome, endereco, bairro, cidade, uf, telefone, email);
        await clienteDB.gravar(novoCliente);

        res.status(201).json({
            message: "Cliente cadastrado com sucesso!"
        });
    } catch (error) {
        res.status(500).json({
            error: "Erro ao cadastrar cliente: " + error.message
        });
    }
});

app.get("/api/clientes", async (req, res) => {
    try {
        const clienteDB = new ClienteDB();
        const listaClientes = await clienteDB.consultar();
        res.json(listaClientes);
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao buscar clientes: " + erro.message
        });
    }
});

app.delete("/api/clientes/:cpf", async (req, res) => {
    try {
        const {
            cpf
        } = req.params;

        if (!cpf) {
            return res.status(400).json({
                error: "CPF é obrigatório para exclusão!"
            });
        }

        const clienteExistente = await clienteDB.consultarPorCpf(cpf);
        if (!clienteExistente) {
            return res.status(404).json({
                error: "Cliente não encontrado!"
            });
        }

        await clienteDB.excluir(clienteExistente); 
        res.json({
            message: "Cliente excluído com sucesso!"
        });
    } catch (error) {
        res.status(500).json({
            error: "Erro ao excluir cliente: " + error.message
        });
    }
});

app.put("/api/clientes/:cpf", async (req, res) => {
    try {
        const {
            cpf
        } = req.params;
        const {
            nome,
            endereco,
            bairro,
            cidade,
            uf,
            telefone,
            email
        } = req.body;

        if (!cpf || !nome || !email) {
            return res.status(400).json({
                error: "CPF, Nome e Email são obrigatórios!"
            });
        }

        const clienteExistente = await clienteDB.consultarPorCpf(cpf);
        if (!clienteExistente) {
            return res.status(404).json({
                error: "Cliente não encontrado!"
            });
        }

        const clienteAtualizado = new Cliente(cpf, nome, endereco, bairro, cidade, uf, telefone, email);
        await clienteDB.alterar(clienteAtualizado);

        res.json({
            message: "Cliente atualizado com sucesso!"
        });
    } catch (error) {
        res.status(500).json({
            error: "Erro ao atualizar cliente: " + error.message
        });
    }
});

app.get("/api/clientes/:cpf", async (req, res) => {
    try {
        const {
            cpf
        } = req.params;

        if (!cpf) {
            return res.status(400).json({
                error: "CPF é obrigatório!"
            });
        }

        const cliente = await clienteDB.consultarPorCpf(cpf);
        if (!cliente) {
            return res.status(404).json({
                error: "Cliente não encontrado!"
            });
        }

        res.json(cliente);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao buscar cliente: " + error.message
        });
    }
});

app.listen(porta, localhost, () => {
    console.log(`Servidor rodando em http://${localhost}:${porta}`);
});