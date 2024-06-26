const express = require('express');
const router = express.Router();
// À ajuster selon la structure
const sousTachesController = require('../controllers/sousTaches.controller');
const authentification = require('../middlewares/authentification.middleware');


router.post('/', authentification, (req, res) => {
    
    sousTachesController.ajouterSousTache(req, res);
});

router.put('/:id', authentification, (req, res) => { // mettre id en header
    
    sousTachesController.modifierSousTache(req, res);
});

router.patch('/:id', authentification, (req, res) => { // mettre id en header
    
    sousTachesController.completeSousTache(req, res);
});

router.delete('/:id', authentification, (req, res) => {
    
    sousTachesController.supprimerSousTache(req, res);
})


module.exports = router;