const bcrypt = require("bcrypt");


// Cria senha HASH
async function gerarSenhaHash(senha) {
    const custoHash = 15;
    let senhaHash = await bcrypt.hash(senha, custoHash);
    return senhaHash;
 }

exports.gerarSenhaHash = gerarSenhaHash;