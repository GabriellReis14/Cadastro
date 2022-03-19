const dataConn = require("../conexao/conexao");
const functions = require("../functions");

const SQLUsuarios = `SELECT * FROM AUTH_LOGIN`;

exports.getUsuarios = () => {
    return new Promise(async (resolve, reject) => {
        
        const client = await dataConn.connect();
        await client.query(SQLUsuarios, function (err, resultado) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(resultado.rows);
            client.release();
        });
    });
};

exports.cadUsuarios = (req) => {
    return new Promise(async (resolve, reject) => {
        const hashSenha = functions.gerarSenhaHash;
        
        const senhaHash = await hashSenha(req.body.senha_usuario);
        let qryInsert = `INSERT INTO AUTH_LOGIN (NOME_USUARIO, EMAIL_USUARIO, SENHA_USUARIO) VALUES ('${req.body.nome_usuario}','${req.body.email_usuario}','${senhaHash}');`
        
        const client = await dataConn.connect();
        await client.query(qryInsert, function (err, resultado) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(resultado.rows);
            client.release();
        });
    });
};