const express = require('express');
const router = express.Router();
const { uploadRoom, generateDesign, getMyDesigns, getDesign, deleteDesign } = require('../controllers/design.controller');
const { protect } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const { validate, designValidation } = require('../utils/validators');

router.post('/upload-room', protect, upload.single('image'), designValidation, validate, uploadRoom);
router.post('/generate', protect, generateDesign);
router.get('/my-designs', protect, getMyDesigns);
router.get('/:id', protect, getDesign);
router.delete('/:id', protect, deleteDesign);

module.exports = router;
