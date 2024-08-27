import express from "express";
import router from "./routes/route.js";

const app = express();

app.use(express.json());


app.use(router);


// Ruta si no encuentra ninguna ruta

app.get("*", (req, res) => res.status(404).json("Not Found"));

app.listen(3000, () => {
  console.log("Servidor Corriendo");
});
