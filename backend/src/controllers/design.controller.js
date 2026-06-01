const designService = require('../services/design.service');
const { sendResponse, sendError } = require('../utils/response');

// @desc    Upload room image and create initial design record
// @route   POST /api/design/upload-room
// @access  Private
const uploadRoom = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, 400, 'Please upload an image');
    }

    const designData = {
      userId: req.user._id,
      originalImage: req.file.path, // Cloudinary URL
      designStyle: req.body.designStyle,
      roomType: req.body.roomType,
      budget: req.body.budget,
      status: 'pending'
    };

    const design = await designService.createDesign(designData);
    return sendResponse(res, 201, true, 'Room uploaded successfully', design);
  } catch (error) {
    next(error);
  }
};

// @desc    Trigger AI generation (mock for now)
// @route   POST /api/design/generate
// @access  Private
const generateDesign = async (req, res, next) => {
  try {
    const { designId } = req.body;
    
    // In a real app, this would call an external AI API
    // Here we just mock the update
    const design = await designService.getDesignById(designId, req.user._id);
    
    design.status = 'completed';
    // Mock generated image
    design.generatedImage = 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg';
    design.processingTime = 4500; // ms
    await design.save();

    return sendResponse(res, 200, true, 'Design generated successfully', design);
  } catch (error) {
    if (error.message === 'Design not found or unauthorized') {
      return sendError(res, 404, error.message);
    }
    next(error);
  }
};

// @desc    Get user's designs
// @route   GET /api/design/my-designs
// @access  Private
const getMyDesigns = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const result = await designService.getDesignsByUser(req.user._id, page, limit);
    
    return sendResponse(res, 200, true, 'Designs fetched successfully', result);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single design
// @route   GET /api/design/:id
// @access  Private
const getDesign = async (req, res, next) => {
  try {
    const design = await designService.getDesignById(req.params.id, req.user._id);
    return sendResponse(res, 200, true, 'Design fetched successfully', design);
  } catch (error) {
    if (error.message === 'Design not found or unauthorized') {
      return sendError(res, 404, error.message);
    }
    next(error);
  }
};

// @desc    Delete design
// @route   DELETE /api/design/:id
// @access  Private
const deleteDesign = async (req, res, next) => {
  try {
    await designService.deleteDesign(req.params.id, req.user._id);
    return sendResponse(res, 200, true, 'Design deleted successfully');
  } catch (error) {
    if (error.message === 'Design not found or unauthorized') {
      return sendError(res, 404, error.message);
    }
    next(error);
  }
};

module.exports = {
  uploadRoom,
  generateDesign,
  getMyDesigns,
  getDesign,
  deleteDesign,
};
