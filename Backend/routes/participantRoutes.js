const express = require('express');
const router = express.Router();
const checkToken = require('../helpers/checkToken');
const isAdmin = require('../helpers/isAdmin');
const ParticipantController = require('../controllers/ParticipantController');

// CRUD admin
router.post('/', checkToken, isAdmin, ParticipantController.create);
router.patch('/:id', checkToken, isAdmin, ParticipantController.updateParticipant);
router.delete('/:id', checkToken, isAdmin, ParticipantController.removeParticipant);
// Visualização e busca pública
router.get('/', checkToken, ParticipantController.getAll);
router.get('/search', checkToken, ParticipantController.search);

module.exports = router;
