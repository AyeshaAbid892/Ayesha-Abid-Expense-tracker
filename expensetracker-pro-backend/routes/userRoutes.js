const express = require('express');
const router = express.Router();

const { getAllUsers, getUserById, getUserSummary } = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:id/summary', getUserSummary);
router.get('/:id', getUserById);

module.exports = router;
