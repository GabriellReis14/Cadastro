const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const consign = require("consign");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../swagger.json");

module.exports = () => {
    const app = express();

    const corsOptions = {
      exposedHeaders: "Authorization",
   };

    app.use(bodyParser.json());
    app.use(cors(corsOptions));
    app.use("/documentacao", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.get("/", function (req, res) {
        res.send("API Cadastro Básico Online!");
     });

    consign().include("src/routes").into(app);

    app.use((err, request, response, next) => {
        if (err instanceof Error) {
           return response.status(400).json({
              status: "error",
              error: err.message,
           });
        }
  
        return response.status(500).json({
           status: "error",
           message: "Internal Server Error",
        });
     });
    
    return app;
}