const express = require('express');
const router = express.Router();
const controller = require('../controllers/medicineController');

router.post('/', controller.createMedicine);
router.get('/', controller.getAllMedicines);

module.exports = router;