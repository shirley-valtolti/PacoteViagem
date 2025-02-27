//Programação orientada a objeto
import ClienteDB from "../DataBase/clienteDB.js";
export default class Cliente {

    //atributos de um cliente
    //Definição de atributos privados e seus respectivos métodos de acesso públicos
    #cpf;  //# é utilizado pelo javascript para definir que um atributo é privado
    #nome;
    #endereco;
    #bairro;
    #cidade;
    #uf;
    #telefone;
    #email;

    constructor(cpf, nome, endereco, bairro, cidade, uf, telefone, email) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#telefone = telefone;
        this.#email = email;
    }

    

    get cpf() {
        return this.#cpf; //this se refere ao próprio objeto
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {    
        this.#nome = novoNome;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get bairro() {
        return this.#bairro;
    }

    set bairro(novoBairro){
        this.#bairro = novoBairro;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(novaCidade){
        this.#cidade = novaCidade;
    }

    get uf(){
        return this.#uf;
    }

    set uf(novaUf){
        this.#uf = novaUf;
    }

    get telefone(){
        return this.#telefone;
    }	

    set telefone(novoTelefone){
        this.#telefone = novoTelefone;
    }

    get email(){
        return this.#email;
    }

    set email(novoEmail){
        this.#email = novoEmail;
    }
 
    //formato JSON de um objeto
    toJSON(){
        return {
            "cpf": this.#cpf,
            "nome": this.#nome,
            "endereco": this.#endereco,
            "bairro": this.#bairro,
            "cidade": this.#cidade,
            "uf": this.#uf,
            "telefone": this.#telefone,
            "email": this.#email
        }
    }

    async gravar(){
        const cliDB = new ClienteDB();
        cliDB.gravar(this);
    }

    async alterar(){
        const cliDB = new ClienteDB();
        cliDB.alterar(this);
    }

    async excluir(){
        const cliDB = new ClienteDB();
        cliDB.excluir(this);
    }

    async consultar(){
        const cliDB = new ClienteDB();
        return await cliDB.consultar(this);
    }

}