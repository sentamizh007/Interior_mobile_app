const mongoose = require('mongoose');

const designSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    originalImage: {
      type: String,
      required: [true, 'Original image is required'],
    },
    generatedImage: {
      type: String,
    },
    designStyle: {
      type: String,
      required: [true, 'Design style is required'],
    },
    roomType: {
      type: String,
      required: [true, 'Room type is required'],
    },
    budget: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
    variations: {
      type: [String],
      default: [],
    },
    prompt: {
      type: String,
    },
    processingTime: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Design', designSchema);
