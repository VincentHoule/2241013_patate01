const express = require('express');
const router = express.Router();
// À ajuster selon la structure
const tachesController = require('../controllers/taches.controller');
const authentification = require('../middlewares/authentification.middleware');

router.get('/liste', authentification, (req, res) => {
    // ici on ne fait que lancer la bonne fonction du controlleur. L'important est que l'objet res soit 
    // utilisé dans le controller (il y a un send() de fait) 
    tachesController.listeTache(req, res);
});

router.get('/:id', authentification, (req, res) => {
    // ici on ne fait que lancer la bonne fonction du controlleur. L'important est que l'objet res soit 
    // utilisé dans le controller (il y a un send() de fait) 
    tachesController.detailTache(req, res);
});

router.post('/', (req, res) => {
    
    tachesController.ajouterTache(req, res);
});


router.put('/:id', (req, res) => {
    
    tachesController.modifierTache(req, res);
});

router.delete('/:id', (req, res) => {
    
    tachesController.supprimerTache(req, res);
})


module.exports = router;