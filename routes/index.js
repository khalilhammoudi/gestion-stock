const users = require("./users");
const produits = require("./produits");

module.exports = function (app) {
  app.get("/", (_, res) => {
    res.send(
      "Veuillez utiliser les routes suivantes :\n" +
        "/users pour la gestion des profils utilisateurs.\n" +
        "/produits pour la gestion des produits.\n"
    );
  });

  /**
   * Utilisateurs
   */
  app.get("/users", users.list);
  app.post("/users", users.add);
  app.put("/users/:id", users.update);
  app.delete("/users/:id", users.delete);

  /**
   * Produits
   */
  app.get("/produits", produits.list);
  app.post("/produits", produits.add);
  app.put("/produits/:id", produits.update);
  app.delete("/produits/:id", produits.delete);
};
