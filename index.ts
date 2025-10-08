import express, { Router } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('static'));

const api = Router();

api.get("/hello", (req, res) => {
  return res.status(200).send({ message: "Hello from the public api!" });
});

api.get("/greet/:name", (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).send({ message: "Missing route param for `name`!" });
  }

  return res.status(200).send({ message: `Hello ${name}!` });
});

api.post("/submit", async (req, res) => {
  return res.status(200).send({
    body: req.body,
    message: "You just posted data",
  });
});

app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
