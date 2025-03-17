import Cliente from "../Model/cliente.js";
export default class ClienteCtrl{

    gravar(requisicao, resposta) {
        if(requisicao.method === 'POST' && requisicao.is(application/json)){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const telefone = dados.telefone;
            const email = dados.email;

            if (cpf && nome && endereco && bairro && cidade && uf && telefone && email){
                const cliente = new Cliente(cpf, nome, endereco, bairro, cidade, uf, telefone, email);
                cliente.gravar().then(() => {
                    resposta.status(201).json(
                        {
                            status: true,
                            mensagem: "Cliente gravado com sucesso!"                        }
                    );
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao gravar o cliente: " + erro
                    });
                });
            }
            else{
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Todos os campos devem ser informados"
                    }
                );
            }
        }
        else{
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida"
            });
        }
    }

    alterar(requisicao, resposta) {
        if((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is(application/json)){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const telefone = dados.telefone;
            const email = dados.email;

            
            if (cpf && nome && endereco && bairro && cidade && uf && telefone && email){
                const cliente = new Cliente(cpf, nome, endereco, bairro, cidade, uf, telefone, email);
                cliente.alterar().then(() => {
                    resposta.status(200).json(
                        {
                            status: true,
                            mensagem: "Cliente alterado com sucesso!"                        }
                    );
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao alterar o cliente: " + erro
                    });
                });
            }
            else{
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Todos os campos devem ser informados"
                    }
                );
            }
        }
    else{
        resposta.status(400).json({
            "status": false,
            "mensagem": "Requisição inválida"
        });
    }
}

    excluir(requisicao, resposta) {
        if(requisicao.method === 'DELETE' && requisicao.is(application/json)){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            if (cpf){
                const cliente = new Cliente(cpf);
                cliente.excluir().then(() => {
                    resposta.status(200).json(
                        {
                            status: true,
                            mensagem: "Cliente excluido com sucesso!"                        }
                    );
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o cliente: " + erro
                    });
                });
            }
            else{
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe o cpf dp cliente a ser excluído"
                    }
                );
            }
        }
    else{
        resposta.status(400).json({
            "status": false,
            "mensagem": "Requisição inválida"
        });
    }
}
            

    consultar(requisicao, resposta) {
        if (requisicao.method === 'GET'){
            const cliente = new Cliente();
            cliente.consultar().then((listaClientes) => {
                resposta.status(200).json({
                    "status": true,
                    "clientes": listaClientes
                }
            );
            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar os clientes: " + erro
                });
            });
        }
        else{
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisicao inválida"
            });
        }
    }

}