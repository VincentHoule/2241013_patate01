const express = require ('express');
// Importation du module swagger-ui-express
const swaggerUi = require('swagger-ui-express');
// Le fichier de documentation JSON, ajustez selon votre projet
const swaggerDocument = require('./src/documentation.json');

const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Demo API"
};



const app = express();
const PORT = 3000;
const cors = require('cors')
/*
const fs = require('fs')
const morgan = require('morgan');
const chemin = require('path');
const accessLog = fs.createWriteStream(chemin.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan(':date[clf] :method :url :status :res[content-length] - :response-time ms', { stream: accessLog }));
*/
app.use(
    cors({
      "Access-Control-Allow-Origin": "*",
      "Allow-Methods": "GET, POST, DELETE, FETCH",
    })
  );
app.use('/tachesMemoire/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
app.use(express.json());
app.use('/tachesMemoire/taches', require('./src/routes/taches'));
app.use('/tachesMemoire/sousTaches', require('./src/routes/sousTaches'));
app.use('/tachesMemoire/utilisateurs', require('./src/routes/utilisateurs'));

app.listen(PORT, () =>{
    console.log('Serveur partie sur le port' + PORT)
});