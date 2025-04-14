const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Router = require("./routes/route");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", Router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`le serveur demare sur le port ${PORT}`));
