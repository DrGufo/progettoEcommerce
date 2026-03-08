var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const uri = "mongodb://localhost:27017";
const bodyParser = require('body-parser');
var parsebody = bodyParser.urlencoded({ extended: true });

const client = new MongoClient(uri);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', parsebody, function(req, res, next) {
  const email = req.body.email;
  var password = req.body.password;

  console.log("Email: " + email);
  console.log("Password: " + password);

  client.connect()
    .then(() => {
      console.log("Connected correctly to server");
      const db = client.db("progettoEcommerce");
      const collection = db.collection("utenti");

      return collection.find({ email: email, password: password }).toArray();
    })
    .then(documents => {
      console.log("Contenuto della collection utenti: ");

      if (documents.length === 0) {
        console.log("Utente non trovato");
        res.status(400).json({ message: "Utente non trovato" });
    
      } else {
        console.log("Utente trovato");
        console.log(documents);

        let isAdmin = false;
        for (let i = 0; i < documents.length; i++) {
          const user = documents[i];
          if (user.email === "admin" && user.password === "admin") {
            isAdmin = true;
            break; 
          }
        }
        if (isAdmin) {
          console.log("Utente amministratore");
          res.status(201).json({ message: "Utente amministratore" });
          
        } else {
          console.log("Utente non amministratore");
          res.status(200).json({ message: "Utente non amministratore" });
        }
      }
    })
    .catch(err=>{
      console.log(err);
    })
    .finally(()=>{
      client.close();
    });
});

router.post('/signUp', parsebody, function(req, res, next) {
  const email = req.body.email;
  var password = req.body.password;

  console.log("Email: " + email);
  console.log("Password: " + password);

  client.connect()
    .then(() => {
      console.log("Connected correctly to server");
      const db = client.db("progettoEcommerce");
      const collection = db.collection("utenti");


      var utente = { email: email, password: password};

      return collection.findOne(utente);
    })

    .then(document => {
      console.log("Contenuto della collection utenti: ");

      if (document) {
        res.status(400).json({ message: "Utente già registrato" });
      }else {
        console.log("Utente non ancora registrato");

        client.connect()
        .then(() => {
          console.log("Connected correctly to server");
          const db = client.db("progettoEcommerce");
          const collection = db.collection("utenti");

          var utente = { email: email, password: password};
          
          return collection.insertOne(utente);
        })
        .then(document => {
          res.status(200).json({ message: "Utente registrato" });
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          client.close(); 
        });
      }
    });
});

router.post('/registrazione', parsebody, function(req, res, next) {
  var sede = req.body.sede;
  var categoria = req.body.categoria;
  var prodotto = req.body.prodotto;
  var prezzo = req.body.prezzo;
  var quantita = req.body.quantita;

  prezzo=parseInt(prezzo);
  quantita=parseInt(quantita);

  console.log("Sede: " + sede);
  console.log("Categoria: " + categoria);
  console.log("Prodotto: " + prodotto);
  console.log("Prezzo: " + prezzo);
  console.log("Quantita: " + quantita);

  client.connect()
    .then(() => {
      console.log("Connected correctly to server");
      const db = client.db("progettoEcommerce");
      const collection = db.collection("prodottiSede1");

      var articolo = { categoria: categoria, descrizione: prodotto, prezzo: prezzo, quantita: quantita};

      return collection.insertOne(articolo);
    })
    .then(document => {
      console.log("Contenuto della collection prodotti: ");
      if (document) {
        console.log("Prodotto trovato:", document);
      } else {
        console.log("Prodotto non trovato");
      }
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      client.close(); 
    });

  res.status(200).json({ message: "Prodotto registrato" });
});

router.post('/modifica', parsebody, function(req, res, next) {
  var sede = req.body.sede;
  var categoria = req.body.categoria;
  var prodotto = req.body.prodotto;
  var prezzo = req.body.prezzo;
  var quantita = req.body.quantita;

  prezzo=parseInt(prezzo);
  quantita=parseInt(quantita);

  console.log("Sede: " + sede);
  console.log("Categoria: " + categoria);
  console.log("Prodotto: " + prodotto);
  console.log("Prezzo: " + prezzo);
  console.log("Quantita: " + quantita);

  client.connect()
    .then(() => {
      console.log("Connected correctly to server");
      const db = client.db("progettoEcommerce");
      const collection = db.collection("prodottiSede1");

      return collection.updateOne({categoria:categoria, descrizione:prodotto},{$set:{prezzo:prezzo, quantita:quantita}});
    })
    .then(document => {
      console.log("Contenuto della collection prodotti: ");
      if (document.matchedCount>0) {
        console.log("Prodotto trovato:", document);
      } else {
        console.log("Prodotto non trovato");
      }
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      client.close(); 
    });

  res.status(200).json({ message: "Prodotto modificato" });
});

router.post('/cancella', parsebody, function(req, res, next) {
  var sede = req.body.sede;
  var categoria = req.body.categoria;
  var prodotto = req.body.prodotto;

  console.log("Sede: " + sede);
  console.log("Categoria: " + categoria);
  console.log("Prodotto: " + prodotto);

  client.connect()
    .then(() => {
      console.log("Connected correctly to server");
      const db = client.db("progettoEcommerce");  
      const collection = db.collection("prodottiSede1");

      return collection.deleteOne({categoria: categoria, descrizione: prodotto});
    })
    .then(document => {
      console.log("Contenuto della collection prodotti: ");
      if (document.deletedCount>0) {
        console.log("Prodotto trovato:", document);
      } else {
        console.log("Prodotto non trovato");
      }
    })
    .catch(err => {
      console.log(err);
    })  
    .finally(() => {
      client.close(); 
    });
  
  res.status(200).json({ message: "Prodotto cancellato" });
});

router.get('/getData', function(req, res, next){
  client.connect()
    .then(() => {
      console.log("Connected correctly to server");
      const db = client.db("progettoEcommerce");
      const collection = db.collection("prodottiSede1");

      return collection.find().toArray();
    })
    .then(documents => {
      console.log("Contenuto della collection prodotti: ");

      if (documents) {
        res.status(200).json({ message: documents});
      } else {
        res.status(400).json({ message: "Prodotto non trovato" });
      }
    })
});
  
router.post('/aggiornaQuantita', function(req, res, next){
  var product = req.body.product;

  client.connect()
    .then(() => {
      console.log("Connected correctly to server");
      const db = client.db("progettoEcommerce");
      const collection = db.collection("prodottiSede1");

      console.log(product._id);

      collection.findOne({ _id: new ObjectId(product._id) })
      .then(prodotto => {

        if (prodotto && prodotto.quantita > 0) {

          collection.updateOne(
            { _id: new ObjectId(product._id) },
            { $set: { quantita: prodotto.quantita - 1 } }
          );
          res.status(200).json({ message: "Prodotto Acquistato" });
        }else {
          res.status(400).json({ message: "Prodotto non Acquistato" });
        }
      })
    })
    .catch(err=>{
      console.log(err);
    })
});

module.exports = router; 