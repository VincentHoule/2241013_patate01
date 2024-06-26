const sql = require("../config/pg_db.js");
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid');

const Utilisateurs = (utilisateurs) => {
    this.nom = utilisateurs.nom;
    this.prenom = utilisateurs.prenom;
    this.courriel = utilisateurs.courriel;
    this.mot_de_passe = utilisateurs.password;
}


Utilisateurs.ajouterUnUtilisateur = (nom, prenom, courriel, mot_de_passe) => {
    return new Promise((resolve, reject) => {

        const costFactor = 10;
        bcrypt.hash(mot_de_passe, costFactor)
            .then(hash => {
                let api = uuidv4.v4();
                const requete = `INSERT INTO utilisateurs (nom, prenom, courriel, cle_api, password) VALUES ($1, $2, $3, $4, $5);`;
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
        const requete = `SELECT COUNT(*) as nbUtilisateur FROM utilisateurs WHERE cle_api = $1 ; `;
        const parametres = [cleApi];

        await = sql.query(requete, parametres, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }

            resolve(resultat.rows[0].nbutilisateur > 0);
        });
    });
}

Utilisateurs.bonneCle = (cleApi, id) => {
    return new Promise((resolve, reject) => {
        const requete = `SELECT * FROM utilisateurs WHERE id = $1 AND cle_api = $2`;
        const parametres = [id, cleApi];

        await - sql.query(requete, parametres, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }

            resolve(resultat.rows)
        })
    });
}

Utilisateurs.voirCle = (courriel, mot_de_passe) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT cle_api, password FROM utilisateurs WHERE courriel = $1;`;
        const parametres = [courriel];

        sql.query(requete, parametres, (erreur, resultat) => {
            if (erreur) {
                reject(erreur);
            }
            bcrypt.compare(mot_de_passe, resultat.rows[0].password)
                .then(res => {
                    resolve(resultat.rows[0]);
                })
                .catch(res => {
                    res.status(404);
                    res.send({ message: "mauvais mot de passe ou courriel. " });
                    return;
                })

        })

    })
}

Utilisateurs.nouvelleCle = (courriel, mot_de_passe, resultat) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(mot_de_passe, resultat.password)
            .then(res => {
                let api = uuidv4.v4();
                const requete = 'UPDATE utilisateurs SET cle_api = $1 WHERE courriel = $2;';
                const parametres = [api, courriel];

                sql.query(requete, parametres, (erreur, resultat) => {
                    if (erreur) {
                        reject(erreur);
                    }
                    resolve(api);
                })
            })
            .catch(res => {
                res.status(404);
                res.send({ message: "mauvais mot de passe. " });
                return;
            })


    })
}

module.exports = Utilisateurs;