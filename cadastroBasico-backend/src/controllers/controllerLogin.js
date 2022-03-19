const modelLogin = require("../models/modelsLogin")
const helper = require("../helper");

exports.login = async (req, res) => {
    try {        
        const {email, senha} = req.body
        if (!email) throw { status: 404, message: "E-mail não informado" };
        if (!senha) throw { status: 404, message: "Senha não informada" };

        let dados = await modelLogin.login(email, senha);
        if(!dados) {
            res.status(400).send(helper.retornoPadrao(false,"Falha no login."));
        } else {
            const { id } = dados[0];
            delete dados[0].senha;
            dados[0].success = true;
            const token = modelLogin.criaTokenJWT(id);         
            res.set("Authorization", token);
            res.send(dados[0]);
        }
    } catch (error) {
        res.status(error.status ? error.status: 400).json({
            status: "error",
            error: error.message,
        });
    };
}