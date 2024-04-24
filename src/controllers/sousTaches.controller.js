const SousTaches = require("../models/sousTaches.model.js");

exports.ajouterSousTache = (req, res) => {

    var message = ""; // Variable de message d'erreur

    // Protection contre les paramêtres invalides
    if (!req.body.titre || (req.body.titre.length <= 0 && req.body.titre.length > 100)) {
        message += "Le nom est vide, manquant ou invalide. ";
    }
    if (!req.params.tache_id || parseInt(req.params.tache_id) <= 0) {
        res.status(400);
        res.send({
            message: "L'id de la tâches est obligatoire et doit être supérieur à 0"
        });
        return;
    }
    if (req.body.complete == null) {
        message += "Le parametre complete est vide, manquant ou invalide. ";
    }
    // Envoie du message d'erreur
    if (message != "") {
        res.status(404);
        res.send({ message: `${message}` });
        return;
    }

    SousTaches.ajouterTache(req.body.nom, req.body.type_primaire, req.body.type_secondaire,
        req.body.pv, req.body.attaque, req.body.defense)
        .then(() => {
            
            res.send({
                Info: "Le pokemon a été ajouté avec succès",
                Pokemon: req.body
            });
        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500);
            res.send({
                message: "Erreur lors de l'insertion"
            });
        });
};

exports.completeSousTache = (req, res) => {

    if (!req.params.id || parseInt(req.params.id) <= 0) {
        res.status(400);

        // Envoie du message d'erreur
        res.send({
            message: "L'id du la tâche est obligatoire et doit être supérieur à 0"
        });
        return;
    }

    Taches.detailSousTache(req.params.id)
        .then((resultat) => {
            if (!resultat[0]) {
                res.status(404);
                res.send({
                    message: `tâches introuvable ${req.params.id}`
                });
                return;   
            }
            
            Taches.completeSousTache(!resultat[0].complete)
                .then(() => {
                    // Envoie du succès de la requete
                    resultat[0].complete = !resultat[0].complete
                    res.send({
                        Message: "La sous-tâche " + resultat[0].titre + " a été modifié avec succès, elle est " + resultat[0].complete,
                        SousTache: resultat[0]
                    });
                })
                .catch((erreur) => {
                    // Envoie de l'échec de la requete
                    console.log('Erreur : ', erreur);
                    res.status(500);
                    res.send({
                        message: "Erreur lors de la modification"
                    });
                });

        })
        .catch((erreur) => {
            // Envoie de l'échec de la requete
            console.log('Erreur : ', erreur);
            res.status(500);
            res.send({
                message: "Erreur lors de la selection"
            });
            return;
        });
};

exports.supprimerSousTache = (req, res) => {
    // Protection contre les paramêtres invalides
    if (!req.params.id || parseInt(req.params.id) <= 0) {
        res.status(400);

        // Envoie du message d'erreur
        res.send({
            message: "L'id de la sous tâche est obligatoire et doit être supérieur à 0. "
        });
        return;
    }

    Taches.detailSousTache(req.params.id)
        .then((resultat) => {
            if (!resultat[0]) {
                res.status(404);
                res.send({
                    message: `sous tâches introuvable ${req.params.id}`
                });
                return;
            }

            Taches.supprimerTache(req.params.id)
                .then(() => {
                    // Envoie du succès de la requete
                    res.send({
                        Message: "La sous tâche " + resultat[0].titre + " a été supprimé avec succès. ",
                        Tache: resultat[0]

                    });
                })
                // Envoie de l'échec de la requete
                .catch((erreur) => {
                    console.log('Erreur : ', erreur);
                    res.status(500);
                    res.send({
                        message: "Erreur lors de la suppression"
                    });
                });
        })
        .catch((erreur) => {
            // Envoie de l'échec de la requete
            console.log('Erreur : ', erreur);
            res.status(500);
            res.send({
                message: "Erreur lors de la selection"
            });
            return;
        });
};
