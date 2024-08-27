import recipes from "./recipes";
import express from "express";

const app = express();

app.use(express.json());
app.use(pruebaMiddleware);

app.use(productRoute);

app.get("/", (req, res) => {
  return res.json(recipes);
});

// Ruta si no encuentra ninguna ruta

app.get("*", (req, res) => res.status(404).json("Not Found"));

app.listen(3000, () => {
  console.log("Servidor Corriendo");
});
