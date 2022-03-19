const modelPessoas = require('../models/modelsPessoas');

exports.getPessoas = (req, res) => {
    const { id } = req.params;
    modelPessoas.getPessoas(id).then(
        sucess => {

            res.status(200).json({ pessoas: sucess });
        },
        error => res.status(500).json(error)
    );
}

exports.cadPessoas = (req, res) => {
    try {
        if (!req.body.hasOwnProperty("nome_pessoa")) throw { status: 404, message: "Nome da pessoa não informado" };
        if (!req.body.hasOwnProperty("tel_pessoa")) throw { status: 404, message: "Telefone da pessoa não informado" };

        modelPessoas.cadPessoas(req).then(dados => {
            res.status(200).send("Pessoa cadastrado com sucesso.");
        });
    } catch (error) {
        res.status(error.status ? error.status : 500).json(error.message ? error.message : "Ocorreu um erro");
    };
}

exports.editPessoas = (req, res) => {
    try {
        if (!req.body.hasOwnProperty("id_pessoa"))
            throw {
                status: 404,
                message: "ID da Pessoa não informado"
            };

        const { id_pessoa } = req.body;
        modelPessoas.validarPessoa(id_pessoa).then((dados) => {
            if (dados.length === 0) {
                res.status(400).send("Pessoa não encontrada.");
            } else {
                modelPessoas.editPessoas(req).then(dados => {
                    res.status(200).send("Pessoa atualizada com sucesso!");
                });
            };
        });
    } catch (error) {
        res.status(error.status ? error.status : 500).json(error.message ? error.message : "Ocorreu um erro");
    };
}

exports.deletePessoa = (req, res) => {
    try {
        const { id } = req.params;
        modelPessoas.validarPessoa(id).then((dados) => {

            if (dados.length === 0) {
                res.status(400).send("Pessoa não encontrada.");
            } else {
                modelPessoas.deletePessoa(id).then((dados) => {
                    res.status(200).send("Pessoa excluída com sucesso!");
                }).catch(() => res.status(427).send("Falha ao excluir a pessoa!"));
            };
        });
    } catch (error) {
        res.status(error.status ? error.status : 500).json(error.message ? error.message : "Ocorreu um erro");
    }
}