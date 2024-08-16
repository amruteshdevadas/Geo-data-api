import mongoose from "mongoose";

const locationsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true }, // can be "restaurant", "store", "landmark", etc.
    address: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"], // 'location.type' must be 'Point'
        required: true,
      },
      coordinates: {
        type: [Number], // Array of numbers: [longitude, latitude]
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create a geospatial index on the location field
locationsSchema.index({ location: "2dsphere" });

const Location = mongoose.model("Location", locationsSchema);

export default Location;
