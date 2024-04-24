const Taches = require("../models/taches.model.js");

exports.detailTache = (req, res) => {

    // Teste si le paramètre id est présent et valide
    if (!req.params.id || parseInt(req.params.id) <= 0) {
        res.status(400);
        res.send({
            message: "L'id de la tâches est obligatoire et doit être supérieur à 0"
        });
        return;
    }

    // Appel à la fonction trouverUnpokemon dans le modèle
    Taches.detailTache(req.params.id)
        // Si c'est un succès
        .then((Taches) => {
            // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
            if (!Taches[0]) {
                res.status(404);
                res.send({
                    message: `tâches introuvable avec l'id ${req.params.id}`
                });
                return;
            }
            // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un pokemon par id
            res.send(Taches[0]);
        })
        // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Erreur lors de la récupération de la tâche avec l'id " + req.params.id
            });
        });
};

exports.listeTache = (req, res) => {
    // Teste si le paramètre id est présent et valide
    if (!req.params.utilisateur_id || parseInt(req.params.utilisateur_id) <= 0) {
        res.status(400);
        res.send({
            message: "L'id de l'utilisateur est obligatoire et doit être supérieur à 0"
        });
        return;
    }


    Taches.listeTache(req.params.utilisateur_id)
        .then((Taches) => {
            // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
            if (!Taches[0]) {
                res.status(404);
                res.send({
                    message: `tâches introuvable ${req.params.utilisateur_id}`
                });
                return;
            }
            //
            res.send({
                Taches: Taches,
                Nombre_de_Taches: Taches.length,
            });

        })

        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Erreur lors de la récupération des tâches avec l'utilisateur" + req.params.utilisateur_id
            });
        });
};

exports.listeTacheComplete = (req, res) => {
    // Teste si le paramètre id est présent et valide
    if (!req.params.utilisateur_id || parseInt(req.params.utilisateur_id) <= 0) {
        res.status(400);
        res.send({
            message: "L'id de l'utilisateur est obligatoire et doit être supérieur à 0"
        });
        return;
    }

    Taches.listeTacheComplete(req.params.utilisateur_id)
        .then((Taches) => {
            // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
            if (!Taches[0]) {
                res.status(404);
                res.send({
                    message: `tâches introuvable ${req.params.utilisateur_id}`
                });
                return;
            }
            //
            res.send({
                Taches: Taches,
                Nombre_de_Taches: Taches.length,
            });

        })

        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Erreur lors de la récupération des tâches avec l'utilisateur" + req.query.utilisateur_id
            });
        });
};

exports.ajouterTache = (req, res) => {

    var message = ""; // Variable de message d'erreur

    // Protection contre les paramêtres invalides
    if (!req.body.titre || (req.body.titre.length <= 0 && req.body.titre.length > 100)) {
        message += "Le nom est vide, manquant ou invalide. ";
    }
    if (!req.body.description || (req.body.description.length < 0 && req.body.description.length > 500)) {
        message += "Le type primaire est manquant ou invalide. ";
    }
    if (!req.body.utilisateur_id || parseInt(req.body.utilisateur_id) < 0) {
        message += "L'id de l'utilisateur est vide ou invalide. ";
    }
    if (!req.body.date_debut) {
        message += "La date de debut est vide ou invalide. ";
    }
    if (!req.body.date_echeance) {
        message += "La date d'échéance est vide ou invalide. ";

    }
    if (req.body.complete == null) {
        message += "Le statue complete est manquant ou invalide. ";

    }


    // Envoie du message d'erreur
    if (message != "") {
        res.status(404);
        res.send({ message: `${message}` });
        return;
    }

    Taches.ajouterTache(req.body.utilisateur_id, req.body.titre, req.body.description,
        req.body.date_debut, req.body.date_echeance, req.body.complete)
        .then(() => {

            res.send({
                Info: "La tâche a été ajouté avec succès",
                Tâche: req.body
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

exports.modifierTache = (req, res) => {

    if (!req.params.id || parseInt(req.params.id) <= 0) {
        res.status(400);

        // Envoie du message d'erreur
        res.send({
            message: "L'id du la tâche est obligatoire et doit être supérieur à 0"
        });
        return;
    }

    Taches.detailTache(req.params.id)
        .then((resultat) => {
            if (!resultat[0]) {
                res.status(404);
                res.send({
                    message: `tâches introuvable ${req.params.id}`
                });
                return;
                
            }
            
            Taches.modifierTache(!resultat[0].complete)
                .then(() => {
                    // Envoie du succès de la requete
                    resultat[0].complete = !resultat[0].complete
                    res.send({
                        Message: "La tâche " + resultat[0].titre + " a été modifié avec succès, elle est " + resultat[0].complete,
                        Tache: resultat[0]
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

exports.supprimerTache = (req, res) => {
    // Protection contre les paramêtres invalides
    if (!req.params.id || parseInt(req.params.id) <= 0) {
        res.status(400);

        // Envoie du message d'erreur
        res.send({
            message: "L'id du la tâche est obligatoire et doit être supérieur à 0"
        });
        return;
    }

    Taches.detailTache(req.params.id)
        .then((resultat) => {
            if (!resultat[0]) {
                res.status(404);
                res.send({
                    message: `tâches introuvable ${req.params.id}`
                });
                return;
            }

            Taches.supprimerTache(req.params.id)
                .then(() => {
                    // Envoie du succès de la requete
                    res.send({
                        Message: "La tache " + resultat[0].titre + " a été supprimé avec succès",
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


}

