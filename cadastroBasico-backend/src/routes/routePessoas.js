const pessoaController = require("../controllers/controllerPessoas");
const middlewares = new (require("../controllers/middlewares"))();


module.exports = router => {
    router.get("/pessoa",middlewares.decode,pessoaController.getPessoas);
    router.get("/pessoa/:id", middlewares.decode,pessoaController.getPessoas);
    router.post("/pessoa/cadastrar", middlewares.decode,pessoaController.cadPessoas);
    router.put("/pessoa/atualizar",middlewares.decode, pessoaController.editPessoas);
    router.delete("/pessoa/deletar/:id", middlewares.decode,pessoaController.deletePessoa);
}