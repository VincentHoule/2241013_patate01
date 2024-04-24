const express = require('express');
const router = express.Router();
// À ajuster selon la structure
const utilisateurController = require('../controllers/utilisateurs.controller');

router.post('/', (req, res) => {
    
    utilisateurController.ajouterUnUtilisateur(req, res);
});


router.get('/cle', async (req, res) => {
    utilisateurController.voirCle(req, res);
} )


module.exports = router;