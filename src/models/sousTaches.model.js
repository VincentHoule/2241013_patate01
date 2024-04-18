// À ajuster selon la structure
const sql = require("../config/pg_db.js");

// constructeur
const SousTaches = (taches) => {
    this.id = taches.id;
    this.utilisateur_id = taches.utilisateur_id;
    this.titre = taches.titre;
    this.description = taches.description;
    this.date_debut = taches.date_debut;
    this.date_echeance = taches.date_echeance;
    this.complete = taches.complete;

};

SousTaches.ajouterSousTache = (utilisateur_id, titre, description, date_debut, date_echeance, complete) => {
    return new Promise((resolve, reject) => {

        const requete = 'INSERT INTO taches ( utilisateur_id, titre, description, date_debut, date_echeance, complete) VALUES ($1, $2, $3, $4, $5, $6) ';
        const params = [utilisateur_id, titre, description, date_debut, date_echeance, complete]

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        })
    });

}

SousTaches.modifierSousTache = (id, tache_id, titre, complete) => {
    return new Promise((resolve, reject) => {

        const requete = 'UPDATE sousTaches SET tache_id = $1, titre = $2, complete = $3 WHERE id = $4 ';
        const params = [parseInt(tache_id), titre, complete, parseInt(id)];

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        })
    });
};

SousTaches.supprimerSousTache = (id) => {
    return new Promise((resolve, reject) => {

        const requete = 'DELETE FROM sousTaches WHERE id = $1;';
        const params = [id];

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        })
    });

}

module.exports = SousTaches;