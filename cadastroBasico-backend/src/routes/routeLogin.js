const controllerLogin = require("../controllers/controllerLogin");

module.exports = router => {
    router.post("/login", controllerLogin.login);
}