const express = require('express');
const router = express.Router();
// À ajuster selon la structure
const sousTachesController = require('../controllers/sousTaches.controller');
const authentification = require('../middlewares/authentification.middleware');

router.get('/liste', authentification, (req, res) => {
    // ici on ne fait que lancer la bonne fonction du controlleur. L'important est que l'objet res soit 
    // utilisé dans le controller (il y a un send() de fait) 
    sousTachesController.listeTache(req, res);
});

router.get('/:id', authentification, (req, res) => {
    // ici on ne fait que lancer la bonne fonction du controlleur. L'important est que l'objet res soit 
    // utilisé dans le controller (il y a un send() de fait) 
    sousTachesController.detailTache(req, res);
});

router.post('/', authentification, (req, res) => {
    
    sousTachesController.ajouterTache(req, res);
});


router.put('/:id', authentification, (req, res) => {
    
    sousTachesController.modifierTache(req, res);
});

router.delete('/:id', authentification, (req, res) => {
    
    sousTachesController.supprimerTache(req, res);
})


module.exports = router;