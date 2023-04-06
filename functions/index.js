import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { addEmploye } from "./src/employees.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("My cloud function API is working! 🥹");
});

app.post("/employees",addEmploye)

export const api = functions.https.onRequest(app);
