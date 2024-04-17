// À ajuster selon la structure
const sql = require("../config/pg_db.js");

// constructeur
const Taches = (taches) => {
    this.id = taches.id;
    this.utilisateur_id = taches.utilisateur_id;
    this.titre = taches.titre;
    this.description = taches.description;
    this.date_debut = taches.date_debut;
    this.date_echeance = taches.date_echeance;
    this.complete = taches.complete;

};

Taches.detailTache = (id) => {
    return new Promise((resolve, reject) => {

        const requete = 'SELECT id, utilisateur_id, titre, description, date_debut, date_echeance, complete FROM taches WHERE id = $1';
        const params = [id]

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat);
        });
    });
};

Taches.listeTache = (utilisateur_id) => {
    return new Promise((resolve, reject) => {

        const requete = 'SELECT id, utilisateur_id, titre, description, date_debut, date_echeance, complete FROM taches WHERE utilisateur_id = $1';
        const params = [utilisateur_id];

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat);
        });
    });

}

Taches.ajouterTache = (utilisateur_id, titre, description, date_debut, date_echeance, complete) => {
    return new Promise((resolve, reject) => {

        const requete = 'INSERT INTO taches ( utilisateur_id, titre, description, date_debut, date_echeance, complete) VALUES ($1, $2, $3, $4, $5, $6) ';
        const params = [utilisateur_id, titre, description, date_debut, date_echeance, complete]

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat);
        })
    });

}

Taches.modifierTache = (utilisateur_id, titre, description, date_debut, date_echeance, complete, id) => {
    return new Promise((resolve, reject) => {

        const requete = 'UPDATE pokemon SET utilisateur_id = $1, titre = $2, description = $3, date_debut = $4, date_echeance = $5, complete = $6 WHERE id = $7 ';
        const params = [utilisateur_id, titre, description, date_debut, date_echeance, complete, parseInt(id)];

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat);
        })
    });
};

Taches.supprimerTache = (id) => {
    return new Promise((resolve, reject) => {

        const requete = 'DELETE FROM taches WHERE id = $1;';
        const params = [id];

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat);
        })
    });

}

module.exports = Taches;