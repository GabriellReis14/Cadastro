const usuarioController = require("../controllers/controllerUsuarios");
const middlewares = new (require("../controllers/middlewares"))();

module.exports = router => {
    router.get("/usuarios",middlewares.decode, usuarioController.getUsuarios);
    router.post("/usuarios/cadastrar", usuarioController.cadUsuarios);
}