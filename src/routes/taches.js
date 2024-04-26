const express = require('express');
const router = express.Router();
// À ajuster selon la structure
const tachesController = require('../controllers/taches.controller');
const authentification = require('../middlewares/authentification.middleware');

router.get('/liste/:utilisateur_id', authentification, (req, res) => {
    // ici on ne fait que lancer la bonne fonction du controlleur. L'important est que l'objet res soit 
    // utilisé dans le controller (il y a un send() de fait) 
    tachesController.listeTache(req, res);
});

router.get('/listeComplete/:utilisateur_id', authentification, (req, res) => {
    // ici on ne fait que lancer la bonne fonction du controlleur. L'important est que l'objet res soit 
    // utilisé dans le controller (il y a un send() de fait) 
    tachesController.listeTacheComplete(req, res);
});

router.get('/:id', authentification, (req, res) => {
    // ici on ne fait que lancer la bonne fonction du controlleur. L'important est que l'objet res soit 
    // utilisé dans le controller (il y a un send() de fait) 
    tachesController.detailTache(req, res);
});

router.post('/', authentification, (req, res) => {

    tachesController.ajouterTache(req, res);
});

router.put('/:id', authentification, (req, res) => { // mettre id en header

    if(!req.query.modifier &&req.query.modifier == 1)
    {
        tachesController.modifierTache(req, res);
    }
    else{
        tachesController.completeTache(req, res);
    }
    
});

router.delete('/:id', authentification, (req, res) => {

    tachesController.supprimerTache(req, res);
})


module.exports = router;