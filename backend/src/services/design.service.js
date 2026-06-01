const Design = require('../models/Design.model');
const User = require('../models/User.model');

const createDesign = async (designData) => {
  const design = await Design.create(designData);
  
  // Increment user's design count
  await User.findByIdAndUpdate(designData.userId, {
    $inc: { designsCount: 1 }
  });

  return design;
};

const getDesignsByUser = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const designs = await Design.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Design.countDocuments({ userId });

  return {
    designs,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    total,
  };
};

const getDesignById = async (designId, userId) => {
  const design = await Design.findOne({ _id: designId, userId });
  if (!design) {
    throw new Error('Design not found or unauthorized');
  }
  return design;
};

const deleteDesign = async (designId, userId) => {
  const design = await Design.findOneAndDelete({ _id: designId, userId });
  if (!design) {
    throw new Error('Design not found or unauthorized');
  }
  
  // Decrement user's design count
  await User.findByIdAndUpdate(userId, {
    $inc: { designsCount: -1 }
  });

  return design;
};

module.exports = {
  createDesign,
  getDesignsByUser,
  getDesignById,
  deleteDesign,
};
