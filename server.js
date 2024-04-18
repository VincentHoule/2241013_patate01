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

const morgan = require('morgan')

app.use('/tachesMemoire/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use('/tachesMemoire/taches', require('./src/routes/taches'));
app.use('/tachesMemoire/utilisateurs', require('./src/routes/utilisateurs'));
const router = express.Router();
router.get('/', (req, res) => {
    res.send("ping")
} )
app.listen(PORT, () =>{
    console.log('Serveur partie')
});