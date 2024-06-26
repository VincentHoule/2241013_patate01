const Utilisateurs = require("../models/utilisateurs.model.js");

exports.ajouterUnUtilisateur = (req, res) => {

    let message = "";

    if (!req.body.nom || (req.body.nom.length <= 0 && req.body.nom.length > 254)) {
        message += "Le nom doit être valide selon le format. "
    }


    if (!req.body.prenom || (req.body.prenom.length <= 0 && req.body.prenom.length > 254)) {
        message += "Le prenom doit être valide selon le format. "
    }

    if (!req.body.courriel || (req.body.courriel.length <= 0 && req.body.courriel.length > 254)) {
        message += "Le courriel doit être valide selon le format. "
    }

    if (!req.body.mot_de_passe || (req.body.mot_de_passe.length <= 0 && req.body.mot_de_passe.length > 254)) {
        message += "Le mot de passe doit être valide selon le format. "
    }

    if (message != "") {
        res.status(400);
        res.send({ message: `${message}` });
        return;
    }

    Utilisateurs.ajouterUnUtilisateur(req.body.nom, req.body.prenom, req.body.courriel, req.body.mot_de_passe)
        .then((resultat) => {

            res.send({
                message: "Utilisateur créé",
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
        message += "Le courriel doit être valide selon le format. "
    }

    if (!req.body.mot_de_passe || (req.body.mot_de_passe.length <= 0 && req.body.mot_de_passe.length > 254)) {
        message += "Le mot de passe doit être valide selon le format. "
    }

    if (message != "") {
        res.status(400);
        res.send({ message: `${message}` });
        return;
    }

    Utilisateurs.voirCle(req.body.courriel, req.body.mot_de_passe)
        .then((resultat) => {
            Utilisateurs.nouvelleCle(req.body.courriel, req.body.mot_de_passe, resultat)
                .then((resultat2) => {
                    res.send({
                        cle: resultat2
                    })
                })
                .catch((erreur) => {
                    console.log('Erreur : ', erreur);
                    res.status(500);
                    res.send({
                        message: "Erreur lors de la selection. "

                    });
                })
        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500);
            res.send({
                message: "Erreur lors de la selection. "

            });
        })


}

