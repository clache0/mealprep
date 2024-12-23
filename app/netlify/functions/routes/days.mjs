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

export default dayRouter;