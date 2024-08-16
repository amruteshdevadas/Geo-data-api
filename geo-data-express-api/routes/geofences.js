import express from "express";
import geoFencesModel from "../models/geo-fences.js";

const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const geoFencesData = await geoFencesModel.find();
    res.status(200).json(geoFencesData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error occurred." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const payload = req.body;
    const savedData = await geoFencesModel.save(payload);
    res.status(200).json({
      id: savedData._id,
      status: "Saved successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error occurred." });
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    const payload = req.body;
    const geoId = req.params.id;
    await geoFencesModel.updateOne({ _id: geoId }, payload);
    res.status(201).json({
      status: "Updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error occurred." });
  }
});

export default router;
