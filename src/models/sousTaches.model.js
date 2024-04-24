// À ajuster selon la structure
const sql = require("../config/pg_db.js");

// constructeur
const SousTaches = (sousTache) => {
    this.id = sousTache.id;
    this.utilisateur_id = sousTache.tache_id;
    this.complete = sousTache.complete;

};

SousTaches.ajouterSousTache = (tache_id, titre,  complete) => {
    return new Promise((resolve, reject) => {

        const requete = 'INSERT INTO taches (tache_id, titre, complete) VALUES ($1, $2, $3) ';
        const params = [tache_id, titre, complete]

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

SousTaches.detailSousTache = (id) => {
    return new Promise((resolve, reject) => {
        const requete = 'SELECT * FROM sousTache WHERE id =  $1';
        const params = [id]

        sql.query(requete, params, (erreur, resultat) => {
            if(erreur)
            {
                reject(erreur)
            }
            resolve(resultat.rows)
        })
    })
};

SousTaches.modifierSousTache = (id, complete) => {
    return new Promise((resolve, reject) => {

        const requete = 'UPDATE sousTaches  complete = $3 WHERE id = $4 ';
        const params = [complete, parseInt(id)];

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