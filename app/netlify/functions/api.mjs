import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import "express-async-errors";
import serverless from "serverless-http"
import dayRouter from "./routes/days.mjs";
import ingredientRouter from "./routes/ingredients.mjs";
import recipeRouter from "./routes/recipes.mjs";

dotenv.config();

const app = express();

// set up CORS for client server on different domain, protocol, port
app.use(cors());

// middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Load routes
app.use('/.netlify/functions/api/days', dayRouter);
app.use('/.netlify/functions/api/recipes', recipeRouter);
app.use('/.netlify/functions/api/ingredients', ingredientRouter);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

export const handler = serverless(app);

