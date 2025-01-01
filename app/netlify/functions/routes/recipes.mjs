import express from "express";
import connectToDatabase from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const recipeRouter = express.Router();

// GET a list of recipes, limit 50
recipeRouter.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = await db.collection("recipes");
    const results = await collection.find({})
      .limit(50)
      .toArray();

      if (results.length === 0) {
        return res.status(204).json({ 
          error: "no recipes found",
          message: "no recipes found",
        });
      }
      else {
        res.status(200).send(results);
      }
    } catch (error) {
    console.error("Error getting recipes from get / ", error);
  }
});

// POST Add a new recipe document to the collection
recipeRouter.post("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = await db.collection("recipes");
    const newDocument = req.body;
    const result = await collection.insertOne(newDocument);
    res.status(200).send(result);
  } catch (error) {
    console.error("Error adding recipe from post / ", error);
  }
});

// PATCH Update a single recipe
recipeRouter.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const { name, notes, ingredientQuantities } = req.body;
  const updates = { $set: {} };

  if (name) {
    updates["$set"]["name"] = name;
  }

  if (notes) {
    updates["$set"]["notes"] = notes;
  }

  if (ingredientQuantities) {
    updates["$set"]["ingredientQuantities"] = ingredientQuantities;
  }

  // attempt to update recipe
  try {
    const db = await connectToDatabase();
    const collection = await db.collection("recipes");
    const result = await collection.updateOne(query, updates);

    // check if recipe is found
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "recipe not found" });
    }
    // check if recipe is modified
    if (result.modifiedCount === 0) {
      return res.status(200).json({ error: "recipe not modified" });
    }
    res.status(200).send(result);
  } catch (error) {
    console.error("Error updating recipe from patch /:id ", error);
  }
});

// PATCH save emoji to recipe
recipeRouter.patch("/:id/emoji", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const { emoji } = req.body;
  const updates = { $set: {} };

  if (!emoji) {
    return res.status(400).json({ error: "Emoji is required." });
  }

  updates["$set"]["emoji"] = emoji;

  try {
    const db = await connectToDatabase();
    const collection = await db.collection("recipes");
    const result = await collection.updateOne(query, updates);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Recipe not found." });
    }
    if (result.modifiedCount === 0) {
      return res.status(200).json({ error: "Emoji not modified." });
    }
    res.status(200).send(result);
  } catch (error) {
    console.error("Error updating emoji from patch /:id/emoji", error);
    res.status(500).json({ error: "Failed to update emoji." });
  }
});

// DELETE single recipe
recipeRouter.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  try {
    const db = await connectToDatabase();
    const collection = db.collection("recipes");
    const result = await collection.deleteOne(query);
    
    // check if recipe is found
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "recipe not found" });
    }

    res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting recipe: ", error);
  }
});

export default recipeRouter;