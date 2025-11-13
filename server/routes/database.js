//CREATION DES DEPENDANCES DE MODULES
var mysql = require('mysql');

//CONNEXION A LA BASE DE DONNEES
const dbConnexion = mysql.createConnection({
    host: "127.0.0.1",
    database: "coding_challenge",
    user: "root",
    password: "root",
    port: 8889,
    // socketPath: "/tmp/mysql.sock",
    strict: false //QUAND DES VALEURS SONT NULL IL LES PREND EN COMPTE 
})

//VERIFICATION DE LA CONNEXION A LA BASE
dbConnexion.connect((err)=>{
    if(err){
           console.log(err.message)
    }else{
        console.log("Sonia, t'es connectée à la base!")
    }
});

//LISTE DES VARIABLES QUI VONT ETRE EXPORTEES
//NOM DE L EXPERT: VARIABLES EXPORTEES
module.exports = dbConnexion