const sql = require("../config/pg_db.js");
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid');

const Utilisateurs = (utilisateurs) => {
    this.nom = utilisateurs.nom;
    this.prenom = utilisateurs.nom;
    this.courriel = utilisateurs.courriel;
    this.mot_de_passe = utilisateurs.mot_de_passe;
}


Utilisateurs.ajouterUnUtilisateur = (nom, prenom, courriel, mot_de_passe) => {
    return new Promise((resolve, reject) => {

        const costFactor = 10;
        bcrypt.hash(mot_de_passe, costFactor)
            .then(hash => {
                console.log('Hash: ', hash)
                let api = uuidv4.v4();
                const requete = 'INSERT INTO utilisateurs (nom, prenom, courriel, cle_api, password) VALUES ($1, $2, $3, $4, $5)';
                const params = [nom, prenom, courriel, api, hash];

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
        const requete = 'SELECT COUNT(*) AS nbUtilisateur FROM utilisateurs u WHERE cle_api = $1; ';
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

        const requete = 'SELECT cle_api, password FROM utilisateurs WHERE courriel = $1;';
        const parametres = [courriel];

        sql.query(requete, parametres, (erreur, resultat) => {
            if (erreur) {
                reject(erreur);
            }
            bcrypt.compare(mot_de_passe, resultat[0].mot_de_passe)
                .then(res => {
                    console.log(resultat)
                    resolve(resultat.rows);
                })
                .catch(res => {
                    res.status(404);
                    res.send({ message: "mauvais mot de passe. " });
                    return;
                })

        })

    })
}

Utilisateurs.nouvelleCle = (courriel, mot_de_passe) => {
    return new Promise((resolve, reject) => {

        let api = uuidv4.v4();
        const requete = 'UPDATE utilisateurs SET cle_api = ? WHERE courriel = ?;';
        const parametres = [api, courriel];

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
                res.send({ message: "mauvais mot de passe. " });
                return;
            })
        })

    })
}

module.exports = Utilisateurs;