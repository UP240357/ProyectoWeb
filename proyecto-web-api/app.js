const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/saludo", (req, res) => {
  res.json({mensaje: "hola joto"})
});

app.listen(PORT, ()=> {
  console.log(`Si jala el server, esta en http://localhost:${PORT}`)
})