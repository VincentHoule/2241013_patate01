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


    Taches.listeTache(req.query.utilisateur_id)
        .then((Taches) => {
            // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
            if (!Taches[0]) {
                res.status(404);
                res.send({
                    message: `tâches introuvable ${req.query.utilisateur_id}`
                });
                return;
            }
            //
            res.send({
                Taches: Taches.slice(req.query.page * 25 - 25, req.query.page * 25),
                type: req.query.type,
                Nombre_de_Taches: Taches.length,
                page: parseInt(req.query.page),
                Nombre_de_pages: Math.ceil(Taches.length / 25)
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
    if (!req.body.nom || (req.body.nom.length <= 0 && req.body.nom.length > 100)) {
        message += "Le nom est vide, manquant ou invalide. ";
    }
    if (!req.body.type_primaire || (req.body.type_primaire.length <= 0 && req.body.type_primaire.length > 100)) {
        message += "Le type primaire est vide, manquant ou invalide. ";
    }
    if (!req.body.type_secondaire || req.body.type_secondaire.length < 0 && req.body.type_secondaire.length > 100) {
        message += "Le type secondaire est manquant ou invalide. ";
    }

    if (!req.body.pv || parseInt(req.body.pv) < 0) {
        message += "Les pv est vide ou invalide. ";
    }
    if (!req.body.attaque || parseInt(req.body.attaque) < 0) {
        message += "L'attaque est vide ou invalide. ";
    }
    if (!req.body.defense || parseInt(req.body.defense) < 0) {
        message += "La defense est vide ou invalide. ";
    }

    // Envoie du message d'erreur
    if (message != "") {
        res.status(404);
        res.send({ message: `${message}` });
        return;
    }

    Taches.ajouterTache(req.body.nom, req.body.type_primaire, req.body.type_secondaire,
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

exports.modifierTache = (req, res) => {

    var message = ""; // Message d'erreur

    // Protection contre les paramêtres invalides
    if (!req.params.id || parseInt(req.params.id) <= 0) {
        message += "L'id est invalide ou absent. "
    }
    if (!req.body.nom || (req.body.nom.length <= 0 && req.body.nom.length > 100)) {
        message += "Le nom est vide, manquant ou invalide. ";
    }
    if (!req.body.type_primaire || (req.body.type_primaire.length <= 0 && req.body.type_primaire.length > 100)) {
        message += "Le type primaire est vide, manquant ou invalide. ";
    }
    if (!req.body.type_secondaire || req.body.type_secondaire.length < 0 && req.body.type_secondaire.length > 100) {
        message += "Le type secondaire est manquant ou invalide. ";
    }

    if (!req.body.pv || parseInt(req.body.pv) < 0) {
        message += "Les pv est vide ou invalide. ";
    }
    if (!req.body.attaque || parseInt(req.body.attaque) < 0) {
        message += "L'attaque est vide ou invalide. ";
    }
    if (!req.body.defense || parseInt(req.body.defense) < 0) {
        message += "La defense est vide ou invalide. ";
    }

    // Envoie du message d'erreur
    if (message != "") {
        res.status(400);
        res.send({ message: `${message}` });
        return;
    }

    Taches.modifierTache(req.body.nom, req.body.type_primaire, req.body.type_secondaire,
        req.body.pv, req.body.attaque, req.body.defense, req.params.id)
        .then(() => {

            // Envoie du succès de la requete
            res.send({
                Message: "Le pokemon id " + req.params.id + " a été modifié avec succès",
                Taches: req.body
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

exports.supprimerTache = (req, res) => {
    // Protection contre les paramêtres invalides
    if (!req.params.id || parseInt(req.params.id) <= 0) {
        res.status(400);

        // Envoie du message d'erreur
        res.send({
            message: "L'id du pokemon est obligatoire et doit être supérieur à 0"
        });
        return;
    }
    info = Taches.detailTache(req.params.id);

    Taches.supprimerTache(req.params.id)
        .then(() => {
            // Envoie du succès de la requete
            res.send({
                Message: "Le pokemon id " + req.params.id + " a été supprimé avec succès",
                Pokemon: info

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

}

