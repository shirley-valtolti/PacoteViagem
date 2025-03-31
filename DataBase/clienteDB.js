import conectar from "./conexao.js";
import Cliente from "../Model/cliente.js";
export default class ClienteDB {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS cliente (
                cpf VARCHAR(14) NOT NULL PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                endereco VARCHAR(150) NOT NULL,
                bairro VARCHAR(100) NOT NULL,
                cidade VARCHAR(100) NOT NULL,
                uf VARCHAR(2) NOT NULL,
                telefone VARCHAR(15) NOT NULL,
                email VARCHAR(100) NOT NULL
            )`;
            await conexao.execute(sql);
        } catch (erro) {
            console.log("Erro ao iniciar a tabela cliente:" + erro);
        }

    }

    async gravar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `INSERT INTO cliente (cpf, nome, endereco, bairro, cidade, uf, telefone, email)
                         VALUES ( ?, ?, ?, ?, ?, ?, ?, ? )`;
            const parametros = [
                cliente.cpf,
                cliente.nome,
                cliente.endereco,
                cliente.bairro,
                cliente.cidade,
                cliente.uf,
                cliente.telefone,
                cliente.email
            ];

            await conexao.execute(sql, parametros);
            await conexao.release(); 

        }
    }

    async alterar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `UPDATE cliente SET 
                         nome = ?, endereco = ?, bairro = ?, cidade = ?,
                         uf = ?, telefone = ?, email = ? WHERE cpf = ?`;
            const parametros = [
                cliente.nome,
                cliente.endereco,
                cliente.bairro,
                cliente.cidade,
                cliente.uf,
                cliente.telefone,
                cliente.email,
                cliente.cpf
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE cpf = ?`;
            const parametros = [cliente.cpf];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = `SELECT * FROM cliente ORDER BY nome`;
        const [registros, campos] = await conexao.execute(sql);
        await conexao.release();
        let listaClientes = [];
        for (const registro of registros) {
            const cliente = new Cliente(registro.cpf,
                registro.nome,
                registro.endereco,
                registro.bairro,
                registro.cidade,
                registro.uf,
                registro.telefone,
                registro.email
            );
            listaClientes.push(cliente);

        }
        return listaClientes;
    }

    async consultarPorCpf(cpf) {
        const conexao = await conectar();
        const sql = `SELECT * FROM cliente WHERE cpf = ?`;
        const [registros] = await conexao.execute(sql, [cpf]);
        await conexao.release();
        if (registros.length > 0) {
            return new Cliente(
                registros[0].cpf,
                registros[0].nome,
                registros[0].endereco,
                registros[0].bairro,
                registros[0].cidade,
                registros[0].uf,
                registros[0].telefone,
                registros[0].email
            );
        }
        return null;
    }

}