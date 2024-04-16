const uuidv4 = require('uuid');
const sql = require("../config/db.js");
const bcrypt = require('bcrypt');

const Utilisateurs = (utilisateurs) => {
    this.nom = utilisateurs.nom;
    this.courriel = utilisateurs.courriel;
    this.mot_de_passe = utilisateurs.mot_de_passe;
}


Utilisateurs.ajouterUnUtilisateur = (nom, courriel, mot_de_passe) => {
    return new Promise((resolve, reject) => {

        const costFactor = 10;
        bcrypt.hash(mot_de_passe, costFactor)
            .then(hash => {
                console.log('Hash: ', hash)
                let api = uuidv4.v4();
                const requete = `INSERT INTO utilisateurs (nom, courriel, mot_de_passe, api)
            VALUES (?, ?, ?, ?)`;
                const params = [nom, courriel, hash, api];

                sql.query(requete, params, (erreur, resultat) => {
                    if (erreur) {
                        reject(erreur);
                    }
                    resolve(api);
                })
            })
            .catch(err => console.error(err.message))


    });
}

Utilisateurs.validationCle = (cleApi) => {
    return new Promise((resolve, reject) => {
        const requete = 'SELECT COUNT(*) AS nbUtilisateur FROM utilisateurs u WHERE api = ?; ';
        const parametres = [cleApi];

        sql.query(requete, parametres, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat[0].nbUtilisateur > 0);
        });
    });
}

Utilisateurs.voirCle = (courriel, mot_de_passe) => {
    return new Promise((resolve, reject) => {

        const requete = 'SELECT api, mot_de_passe FROM utilisateurs WHERE courriel = ?;';
        const parametres = [courriel];

        sql.query(requete, parametres, (erreur, resultat) => {
            if (erreur) {
                reject(erreur);
            }
            bcrypt.compare(mot_de_passe, resultat[0].mot_de_passe)
                .then(res => {
                    console.log(resultat)
                    resolve(resultat);
                })
                .catch(res => {
                    res.status(404);
                    res.send({ message: "mauvais mot de passe" });
                    return;
                })

        })

    })
}

Utilisateurs.nouvelleCle = (courriel, mot_de_passe) => {
    return new Promise((resolve, reject) => {

        let api = uuidv4.v4();
        const requete = 'UPDATE utilisateurs SET api = ? WHERE courriel = ?;';
        const parametres = [api, courriel];

        sql.query(requete, parametres, (erreur, resultat) => {
            if (erreur) {
                reject(erreur);
            }
            resolve(resultat);
        })

    })
}

module.exports = Utilisateurs;