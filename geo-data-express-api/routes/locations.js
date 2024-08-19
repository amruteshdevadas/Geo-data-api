import express from "express";
import locationModel from "../models/locations.js";

const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const locationData = await locationModel.find();
    res.status(200).json(locationData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error occurred." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const payload = req.body;
    const savedData = await locationModel.save(payload);
    res.status(201).json({
      id: savedData._id,
      status: "Saved successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error occurred." });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const payload = req.body;
    const locationId = req.params.id;
    await locationModel.updateOne({ _id: locationId }, payload);
    res.status(201).json({
      status: "Updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error occurred." });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const locationId = req.params.id;
    await locationModel.deleteOne(locationId);
    res.status(201).json({
      status: "deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error occurred." });
  }
});

export default router;
