const express = require('express');
const router = express.Router();
// À ajuster selon la structure
const utilisateurController = require('../controllers/utilisateurs.controller');

router.post('/', (req, res) => {
    
    utilisateurController.ajouterUnUtilisateur(req, res);
});


router.get('/cle', (req, res) => {
    utilisateurController.voirCle(req, res);
} )

router.get('/cle:nouvelle', (req, res) => {
    utilisateurController.voirCle(req, res);
} )

module.exports = router;