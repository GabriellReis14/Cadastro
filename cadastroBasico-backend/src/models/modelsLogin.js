const dataConn = require("../conexao/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const JWT_PASS = process.env.CHAVE_JWT;

exports.login = (email, password) => {
    return new Promise(async (resolve, reject) => {
        let qryLogin;

        const client = await dataConn.connect();

        qryLogin = `SELECT ID_USUARIO as id, NOME_USUARIO as nome, EMAIL_USUARIO as email, SENHA_USUARIO as senha 
                    FROM AUTH_LOGIN WHERE EMAIL_USUARIO = '${email}'`;

        await client.query(qryLogin, async function (err, resultado) {
            if (err) {
                console.log(err);
                return reject(err);
            }

            let dados = resultado.rows;
            client.release();
            try {
                if (dados.length === 0) {
                    dados = false;
                    return resolve(dados);
                } else {
                    const senhaValida = await bcrypt.compare(password, dados[0].senha);

                    if (senhaValida) {
                        return [resolve(dados), senhaValida];
                    } else {
                        dados = false;
                        return resolve(dados);
                    }
                }
            } catch (error) {
                if (error) {
                    console.log(error)
                }
            }

        });
    })
};

exports.criaTokenJWT = (idusuario) => {
    const payload = {
        id: idusuario,
    };
    const token = jwt.sign(payload, JWT_PASS);
    return token;
};
