const express = require('express');
const router = express.Router();
// À ajuster selon la structure
const sousTachesController = require('../controllers/sousTaches.controller');
const authentification = require('../middlewares/authentification.middleware');


router.post('/', authentification, (req, res) => {

    sousTachesController.ajouterSousTache(req, res);
});

router.put('/:id', authentification, (req, res) => { // mettre id en header

    if (!req.query.modifier && req.query.modifier == 1) {
        sousTachesController.modifierSousTache(req, res);

    }
    else{
        sousTachesController.completeSousTache(req, res);

    }
});


router.delete('/:id', authentification, (req, res) => {

    sousTachesController.supprimerSousTache(req, res);
})


module.exports = router;