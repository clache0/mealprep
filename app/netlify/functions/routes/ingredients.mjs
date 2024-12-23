import express from "express";
import connectToDatabase from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const ingredientRouter = express.Router();

// GET a list of ingredients, limit 50
ingredientRouter.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = await db.collection("ingredients");
    const results = await collection.find({})
      .limit(50)
      .toArray();

      if (results.length === 0) {
        return res.status(204).json({ 
          error: "no ingredients found",
          message: "no ingredients found",
        });
      }
      else {
        res.status(200).send(results);
      }
    } catch (error) {
    console.error("Error getting ingredients from get / ", error);
  }
});

// POST Add a new ingredient document to the collection
ingredientRouter.post("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = await db.collection("ingredients");
    const newDocument = req.body;
    const result = await collection.insertOne(newDocument);
    res.status(200).send(result);
  } catch (error) {
    console.error("Error adding ingredient from post / ", error);
  }
});

// PATCH Update a single ingredient
ingredientRouter.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const { name } = req.body;
  const updates = { $set: {} };

  if (name) {
    updates["$set"]["name"] = name;
  }

  // attempt to update ingredient
  try {
    const db = await connectToDatabase();
    const collection = await db.collection("ingredients");
    const result = await collection.updateOne(query, updates);

    // check if ingredient is found
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "ingredient not found" });
    }
    // check if ingredient is modified
    if (result.modifiedCount === 0) {
      return res.status(200).json({ error: "ingredient not modified" });
    }
    res.status(200).send(result);
  } catch (error) {
    console.error("Error updating ingredient from patch /:id ", error);
  }
});

// DELETE single ingredient
ingredientRouter.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  try {
    const db = await connectToDatabase();
    const collection = db.collection("ingredients");
    const result = await collection.deleteOne(query);
    
    // check if ingredient is found
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "ingredient not found" });
    }

    res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting ingredient: ", error);
  }
});

export default ingredientRouter;