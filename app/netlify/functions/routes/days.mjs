import express from "express";
import connectToDatabase from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const dayRouter = express.Router();

// GET a list of days, limit 50
dayRouter.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = await db.collection("days");
    const results = await collection.find({})
      .limit(50)
      .toArray();

      if (results.length === 0) {
        return res.status(204).json({ 
          error: "no days found",
          message: "no days found",
        });
      }
      else {
        res.status(200).send(results);
      }
    } catch (error) {
    console.error("Error getting days from get / ", error);
  }
});

// POST Add a new day document to the collection
dayRouter.post("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = await db.collection("days");
    const newDocument = req.body;
    const result = await collection.insertOne(newDocument);
    res.status(200).send(result);
  } catch (error) {
    console.error("Error adding day from post / ", error);
  }
});

// POST Add a recipe to a day
dayRouter.post("/:id/add-recipe", async (req, res) => {
  const { id } = req.params;
  const { recipeId } = req.body;

  // Check if recipeId is provided
  if (!recipeId) {
    return res.status(400).json({ error: "recipeId is required" });
  }

  try {
    const db = await connectToDatabase();
    const collection = await db.collection("days");
    const query = { _id: new ObjectId(id) };

    // Use $addToSet to ensure recipeId is not added multiple times
    const update = { $addToSet: { recipeIds: recipeId } };
    const result = await collection.updateOne(query, update);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Day not found" });
    }

    if (result.modifiedCount === 0) {
      return res.status(200).json({ message: "Recipe already associated with the day" });
    }

    res.status(200).json({ message: "Recipe added to day successfully" });
  } catch (error) {
    console.error("Error adding recipe to day: ", error);
    res.status(500).json({ error: "Failed to add recipe to day" });
  }
});

// PATCH Update a single day
dayRouter.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const { day, recipeIds } = req.body;
  const updates = { $set: {} };

  if (day) {
    updates["$set"]["day"] = day;
  }

  if (recipeIds) {
    updates["$set"]["recipeIds"] = recipeIds;
  }

  // attempt to update day
  try {
    const db = await connectToDatabase();
    const collection = await db.collection("days");
    const result = await collection.updateOne(query, updates);

    // check if day is found
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "day not found" });
    }
    // check if day is modified
    if (result.modifiedCount === 0) {
      return res.status(200).json({ error: "day not modified" });
    }
    res.status(200).send(result);
  } catch (error) {
    console.error("Error updating day from patch /:id ", error);
  }
});

// PATCH Batch update multiple days
dayRouter.patch("/batch/update", async (req, res) => {
  const days = req.body;

  if (!Array.isArray(days)) {
    return res.status(400).json({ error: "Input must be an array of Day objects" });
  }

  try {
    const db = await connectToDatabase();
    const collection = await db.collection("days");

    const bulkOperations = days.map((day) => {
      const query = { _id: new ObjectId(day._id) };
      const update = { $set: { name: day.name, recipeIds: day.recipeIds } };
      return { updateOne: { filter: query, update } };
    });

    const result = await collection.bulkWrite(bulkOperations);
    res.status(200).json({ message: "Batch update completed", result });
  } catch (error) {
    console.error("Error updating batch of days: ", error);
    res.status(500).json({ error: "Failed to update batch of days" });
  }
});

// DELETE single day
dayRouter.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  try {
    const db = await connectToDatabase();
    const collection = db.collection("days");
    const result = await collection.deleteOne(query);
    
    // check if day is found
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "day not found" });
    }

    res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting day: ", error);
  }
});

// DELETE a recipe from a day
dayRouter.delete("/:id/recipes/:recipeId", async (req, res) => {
  const { id, recipeId } = req.params;

  // Validate the input
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid day ID" });
  }

  if (!recipeId) {
    return res.status(400).json({ error: "Recipe ID is required" });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection("days");
    const query = { _id: new ObjectId(id) };

    // Use $pull to remove the recipeId from the recipeIds array
    const update = { $pull: { recipeIds: recipeId } };
    const result = await collection.updateOne(query, update);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Day not found" });
    }

    if (result.modifiedCount === 0) {
      return res.status(200).json({ message: "Recipe not associated with this day" });
    }

    res.status(200).json({ message: "Recipe removed from day successfully" });
  } catch (error) {
    console.error("Error removing recipe from day: ", error);
    res.status(500).json({ error: "Failed to remove recipe from day" });
  }
});


export default dayRouter;