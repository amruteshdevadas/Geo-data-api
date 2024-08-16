import mongoose from "mongoose";

const geoFencesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true }, // can be "restricted_area", "city_boundary", etc.
    area: {
      type: {
        type: String,
        enum: ["Polygon"], // 'area.type' must be 'Polygon'
        required: true,
      },
      coordinates: {
        type: [[[Number]]], // Array of arrays of arrays of numbers: [[[longitude, latitude]]]
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create a geospatial index on the area field
geoFencesSchema.index({ area: "2dsphere" });

const GeoFences = mongoose.model("GeoFences", geoFencesSchema);

export default GeoFences;
