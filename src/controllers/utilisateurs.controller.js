const Utilisateurs = require("../models/utilisateurs.model.js");

exports.ajouterUnUtilisateur = (req, res) => {

    let message = "";

    if (!req.body.nom || (req.body.nom.length <= 0 && req.body.nom.length > 254)) {
        message += "Le nom doit être valide"
    }

    if (!req.body.courriel || (req.body.courriel.length <= 0 && req.body.courriel.length > 254)) {
        message += "Le courriel doit être valide"
    }

    if (!req.body.mot_de_passe || (req.body.mot_de_passe.length <= 0 && req.body.mot_de_passe.length > 254)) {
        message += "Le courriel doit être valide"
    }

    if (message != "") {
        res.status(404);
        res.send({ message: `${message}` });
        return;
    }

    Utilisateurs.ajouterUnUtilisateur(req.body.nom, req.body.courriel, req.body.mot_de_passe)
        .then((resultat) => {

            res.send({
                Message: "Utilisateur créé",
                cle_api: resultat
            })
        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500);
            res.send({
                message: "Erreur lors de l'insertion"

            });
        })
}

exports.voirCle = (req, res) => {

    let message = "";
    if (!req.body.courriel || (req.body.courriel.length <= 0 && req.body.courriel.length > 254)) {
        message += "Le courriel doit être valide"
    }

    if (message != "") {
        res.status(404);
        res.send({ message: `${message}` });
        return;
    }

    if (req.params.nouvelle == "1") {
        console.log("e");
        Utilisateurs.nouvelleCle(req.body.courriel, req.body.mot_de_passe);

    }

    Utilisateurs.voirCle(req.body.courriel, req.body.mot_de_passe)
        .then((resultat) => {

            res.send({
                cle: resultat
            })

        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500);
            res.send({
                message: "Erreur lors de la selection"

            });
        })
}
