const modelUsuarios = require('../models/modelsUsuarios');

exports.getUsuarios = (req, res) => {

    modelUsuarios.getUsuarios().then(
        sucess => {
            res.status(200).json({ Usuarios: sucess });
        },
        error => res.status(500).json(error)
    );
};

exports.cadUsuarios = (req, res) => {
    try {
        if (!req.body.hasOwnProperty("nome_usuario")) throw { status: 404, message: "Nome do Usuário não informado" };
        if (!req.body.hasOwnProperty("email_usuario")) throw { status: 404, message: "E-mail do Usuário não informado" };
        if (!req.body.hasOwnProperty("senha_usuario")) throw { status: 404, message: "Senha do Usuário não informado" };

        modelUsuarios.cadUsuarios(req).then(dados => {
            res.status(200).send("Usuário cadastrado com sucesso.");
        });
    } catch (error) {
        res.status(error.status ? error.status : 500).json(error.message ? error.message : "Ocorreu um erro");
    };
};