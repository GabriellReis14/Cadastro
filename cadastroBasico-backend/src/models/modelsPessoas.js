const dataConn = require("../conexao/conexao");
const querys = require("../conexao/querys");

const columns = [
    "nome_pessoa",
    "tel_pessoa",
    "endereco_pessoa",
    "bairro_pessoa",
    "cidade_pessoa",
    "uf_pessoa",
]

exports.getPessoas = (id = null) => {
    let SQLPessoas = "SELECT * FROM PESSOA"

    return new Promise(async (resolve, reject) => {
        const client = await dataConn.connect();
        if (id) {
            SQLPessoas += ` WHERE ID_PESSOA = ${id}`
        }
        SQLPessoas += " ORDER BY ID_PESSOA ASC"

        await client.query(SQLPessoas, function (err, resultado) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(resultado.rows);
            client.release();
        });
    });
}

exports.cadPessoas = (req) => {
    return new Promise(async (resolve, reject) => {

        let qryInsert = querys.insert("Pessoa", req.body, columns);

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

exports.editPessoas = async (req) => {
    return new Promise(async (resolve, reject) => {

        let qryUpdate = querys.update("Pessoa", req.body, columns, ` WHERE ID_PESSOA = ${req.body.id_pessoa}`);

        const client = await dataConn.connect();

        await client.query(qryUpdate, function (err, resultado) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(resultado.rows);
            client.release();
        });
    });
};

exports.deletePessoa = (id) => {
    return new Promise(async (resolve, reject) => {

        let qryDelete = `DELETE FROM Pessoa WHERE ID_PESSOA = ${id}`;

        const client = await dataConn.connect();

        await client.query(qryDelete, function (err, resultado) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(resultado.rows);
            client.release();
        });
    });
};

exports.validarPessoa= (id) => {
    let qryValidaPessoa = `SELECT * FROM Pessoa WHERE ID_PESSOA = ${id}`

    return new Promise(async (resolve, reject) => {

        const client = await dataConn.connect();
        await client.query(qryValidaPessoa, function (err, resultado) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(resultado.rows);
            client.release();
        });
    });
};
