const SousTaches = require("../models/sousTaches.model.js");

exports.ajouterSousTache = (req, res) => {

    var message = ""; // Variable de message d'erreur

    // Protection contre les paramêtres invalides
    if (!req.body.titre || (req.body.titre.length <= 0 && req.body.titre.length > 100)) {
        message += "Le nom est vide, manquant ou invalide. ";
    }
    if (!req.body.tache_id || parseInt(req.body.tache_id) <= 0) {
        message += "L'id de la tâches est obligatoire et doit être supérieur à 0";
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

    SousTaches.ajouterSousTache(req.body.tache_id, req.body.titre, req.body.complete)
        .then(() => {

            res.send({
                Info: "La sous-tâche a été ajouté avec succès",
                SousTache: req.body
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

exports.modifierSousTache = (req, res) => {

    var message = ""; // Variable de message d'erreur

    // Protection contre les paramêtres invalides
    if (!req.body.titre || (req.body.titre.length <= 0 && req.body.titre.length > 100)) {
        message += "Le nom est vide, manquant ou invalide. ";
    }
    if (!req.body.tache_id || parseInt(req.body.tache_id) <= 0) {
        message += "L'id de la tâches est obligatoire et doit être supérieur à 0";
    }
    if (req.body.complete == null) {
        message += "Le parametre complete est vide, manquant ou invalide. ";
    }

    if (!req.params.id || parseInt(req.params.id) <= 0) {
        message += "L'id de la sous-tâche est obligatoire et doit être supérieur à 0";
    }

    if (message != "") {
        res.status(404);
        res.send({ message: `${message}` });
        return;
    }

    SousTaches.modifierSousTache(req.body.tache_id, req.body.titre, req.body.complete, req.params.id)
        .then(() => {
            // Envoie du succès de la requete
            SousTaches.detailSousTache(req.params.id)
                .then((resultat) => {
                    if (!resultat[0]) {
                        res.status(404);
                        res.send({
                            message: `tâches introuvable ${req.params.id}`
                        });
                        return;
                    }
                    res.send({
                        Message: "La sous-tâche " + resultat[0].titre + " a été modifié avec succès",
                        SousTache: resultat[0]
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

        })
        .catch((erreur) => {
            // Envoie de l'échec de la requete
            console.log('Erreur : ', erreur);
            res.status(500);
            res.send({
                message: "Erreur lors de la modification"
            });
        });

};

exports.completeSousTache = (req, res) => {

    if (!req.params.id || parseInt(req.params.id) <= 0) {
        res.status(400);
        // Envoie du message d'erreur
        res.send({
            message: "L'id de la sous-tâche est obligatoire et doit être supérieur à 0"
        });
        return;
    }

    SousTaches.detailSousTache(req.params.id)
        .then((resultat) => {
            if (!resultat[0]) {
                res.status(404);
                res.send({
                    message: `tâches introuvable ${req.params.id}`
                });
                return;
            }

            SousTaches.completeSousTache(!resultat[0].complete)
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

    SousTaches.detailSousTache(req.params.id)
        .then((resultat) => {
            if (!resultat[0]) {
                res.status(404);
                res.send({
                    message: `sous tâches introuvable ${req.params.id}`
                });
                return;
            }

            SousTaches.supprimerTache(req.params.id)
                .then(() => {
                    // Envoie du succès de la requete
                    res.send({
                        Message: "La sous-tâche " + resultat[0].titre + " a été supprimé avec succès. ",
                        SousTache: resultat[0]

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
