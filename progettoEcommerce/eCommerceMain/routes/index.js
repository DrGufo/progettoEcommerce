var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});

router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  console.log("Email: " + email);
  console.log("Password: " + password);

  fetch('http://localhost:3010/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then(response => {
      if(response.status === 201) {
        res.redirect('/operazioni');
      }else if(response.status === 200){
        res.redirect('/visualizza');
      }else{
        res.redirect('/login');
      }
    }); 
});

router.get('/signUp', function(req, res, next) {
  res.render('signUp', { title: 'signUp' });
});

router.post('/signUp', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  console.log("Email: " + email);
  console.log("Password: " + password);

  fetch('http://localhost:3010/signUp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then(response => {
      if(response.status === 200) {
        res.redirect('/login');
      }else{
        res.redirect('/signUp');
      }
    });
});

router.get('/operazioni', function(req, res, next) {
  res.render('operazioni', { title: 'operazioni' });
});

router.post('/registrazione', function(req, res, next) {
  var sede = req.body.sede;
  var categoria = req.body.categoria;
  var prodotto = req.body.prodotto;
  var prezzo = req.body.prezzo;
  var quantita = req.body.quantita;

  prezzo = parseInt(prezzo);
  quantita = parseInt(quantita);

  console.log("Sede: " + sede);
  console.log("Categoria: " + categoria);
  console.log("Prodotto: " + prodotto);
  console.log("Prezzo: " + prezzo);
  console.log("Quantita: " + quantita);

  switch(sede){
    case "principale1":
      fetch('http://localhost:3010/registrazione', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoria: categoria, prodotto: prodotto, prezzo: prezzo, quantita: quantita })
      })
        .then(response => {
          if(response.status === 200) {
            console.log("Prodotto registrato");
          }else{
            console.log("Prodotto non registrato");
          }
        });
      break;
    case "principale2":
      fetch('http://localhost:3020/registrazione', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoria: categoria, prodotto: prodotto, prezzo: prezzo, quantita: quantita }) 
      })
        .then(response => {
          if(response.status === 200) {
            console.log("Prodotto registrato");
          }else{
            console.log("Prodotto non registrato");
          }
        });
      break;
    case "remota1":
      fetch("http://localhost/php/progettoEcommerceSediRemote/Sede1/dbRegistrazioneSede1.php", {
        method: "POST",
        body: JSON.stringify({categoria: categoria, prodotto: prodotto, prezzo: prezzo, quantita: quantita})
      })
      .then(response => response.text()) 
      .then(data => {
        console.log(data);
      });
      break;
    case "remota2":
      fetch("http://localhost/php/progettoEcommerceSediRemote/Sede2/dbRegistrazioneSede2.php", {
        method: "POST",
        body: JSON.stringify({categoria: categoria, prodotto: prodotto, prezzo: prezzo, quantita: quantita})
      })
      .then(response => response.text())
      .then(data => {
        console.log(data);
      });
      break;
    default:
      console.log("Errore");
  }
  res.redirect('/operazioni');
});

router.post('/modifica', function(req, res, next) {
  var sede = req.body.sede;
  var categoria = req.body.categoria;
  var prodotto = req.body.prodotto;
  var prezzo = req.body.prezzo;
  var quantita = req.body.quantita;

  prezzo = parseInt(prezzo);
  quantita = parseInt(quantita);

  console.log("Sede: " + sede);
  console.log("Categoria: " + categoria);
  console.log("Prodotto: " + prodotto);
  console.log("Prezzo: " + prezzo);
  console.log("Quantita: " + quantita);

  switch(sede){
    case "principale1":
      fetch('http://localhost:3010/modifica', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoria: categoria, prodotto: prodotto, prezzo: prezzo, quantita: quantita })
      })
        .then(response => {
          if(response.status === 200) {
            console.log("Prodotto modificato");
          }else{
            console.log("Prodotto non modificato");
          }
        });
      break;
    case "principale2":
      fetch('http://localhost:3020/modifica', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoria: categoria, prodotto: prodotto, prezzo: prezzo, quantita: quantita }) 
      })
        .then(response => {
          if(response.status === 200) {
            console.log("Prodotto modificato");
          }else{
            console.log("Prodotto non modificato");
          }
        });
      break;
    case "remota1":
      fetch("http://localhost/php/progettoEcommerceSediRemote/Sede1/dbModificaSede1.php", {
        method: "POST",
        body: JSON.stringify({categoria: categoria, prodotto: prodotto, prezzo: prezzo, quantita: quantita})
      })
      .then(response => response.text())
      .then(data => {
        console.log(data);
      });
      break;
    case "remota2":
      fetch("http://localhost/php/progettoEcommerceSediRemote/Sede2/dbModificaSede2.php", {
        method: "POST",
        body: JSON.stringify({categoria: categoria, prodotto: prodotto, prezzo: prezzo, quantita: quantita})
      })
      .then(response => response.text())
      .then(data => {
        console.log(data);
      });
      break;
    default:
      console.log("Errore");
  }
  res.redirect('/operazioni');
});

router.post('/cancella', function(req, res, next) {
  var sede = req.body.sede;
  var categoria = req.body.categoria;
  var prodotto = req.body.prodotto;

  console.log("Sede: " + sede);
  console.log("Categoria: " + categoria);
  console.log("Prodotto: " + prodotto);

  switch(sede){
    case "principale1":
      fetch('http://localhost:3010/cancella', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoria: categoria, prodotto: prodotto })
      })
        .then(response => {
          if(response.status === 200) {
            console.log("Prodotto cancellato");
          }else{
            console.log("Prodotto non cancellato");
          }
        });
      break;
    case "principale2":
      fetch('http://localhost:3020/cancella', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoria: categoria, prodotto: prodotto })
      })
        .then(response => {
          if(response.status === 200) {
            console.log("Prodotto cancellato");
          }else{
            console.log("Prodotto non cancellato");
          }
        });
      break;
    case "remota1":
      fetch("http://localhost/php/progettoEcommerceSediRemote/Sede1/dbCancellaSede1.php", {
        method: "POST",
        body: JSON.stringify({categoria: categoria, prodotto: prodotto})
      })
      .then(response => response.text())
      .then(data => {
        console.log(data);
      });
      break;
    case "remota2":
      fetch("http://localhost/php/progettoEcommerceSediRemote/Sede2/dbCancellaSede2.php", {
        method: "POST",
        body: JSON.stringify({categoria: categoria, prodotto: prodotto})
      })
      .then(response => response.text())
      .then(data => {
        console.log(data);
      });
      break;
    default:
      console.log("Errore");
  }
  res.redirect('/operazioni');
});

router.get('/visualizza', function(req, res, next) {
  var arrayProdotti = [];

  fetch('http://localhost:3010/getData')
  .then(response1 => response1.json())
  .then(data1 => {

    arrayProdotti=arrayProdotti.concat(data1.message);

    console.log(arrayProdotti);

    console.log("-------------------------");

    fetch('http://localhost:3020/getData')
    .then(response2 => response2.json())
    .then(data2 => {
      arrayProdotti=arrayProdotti.concat(data2.message);
      console.log(arrayProdotti);

      console.log("-------------------------");

      fetch("http://localhost/php/progettoEcommerceSediRemote/Sede1/dbSede1.php")
      .then(response3 => response3.json())
      .then(data3 => {
        arrayProdotti=arrayProdotti.concat(data3);
        console.log(arrayProdotti);

        console.log("-------------------------");

        fetch("http://localhost/php/progettoEcommerceSediRemote/Sede2/dbSede2.php")
        .then(response4 => response4.json())
        .then(data4 => {
          arrayProdotti=arrayProdotti.concat(data4);
          console.log(arrayProdotti);

          console.log("-------------------------");

          res.render('visualizza', { title: 'visualizza', prodotti: arrayProdotti });
        });
      });
    });
  });
});

router.post('/spedizioni', function(req, res, next){
  console.log(req.body);
  res.render('spedizioni', { title: 'Spedizioni' , prodotto: JSON.parse(req.body.product)});
});

router.get('/spedizioni', function(req, res, next){
  res.render('spedizioni', { title: 'Spedizioni' });
});

router.post('/checkout', function(req, res, next){
  var ritirabileInSede=0;
  var ritirabileInSede1=0;
  var ritirabileInNegozio1=0;
  var ritirabileInNegozio2=0;

  var product = JSON.parse(req.body.product);

  console.log(product);

  if(req.body.but=="casa"){
      fetch('http://localhost:3010/aggiornaQuantita', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({product})
      })
      .then(response => {
        if(response.status === 200) {
          console.log("Prodotto acquistato");
          res.render('checkoutSpedizioneCasa', { title: 'Checkout' , prodotto: JSON.parse(req.body.product)});
        }else{
          console.log("Prodotto non aggiornato");

          fetch('http://localhost:3020/aggiornaQuantita', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({product})
        })
        .then(response => {
          if(response.status === 200) {
            console.log("Prodotto acquistato");
            res.render('checkoutSpedizioneCasa', { title: 'Checkout' , prodotto: JSON.parse(req.body.product)});
          }else{
            console.log("Prodotto non aggiornato");

            fetch("http://localhost/php/progettoEcommerceSediRemote/Sede1/dbAcquistoSede1.php", {
              method: "POST",
              body: JSON.stringify(product)
            })
            .then(response => response.text())
            .then(data => {
              console.log(data);
              if(data == "Prodotto acquistato con successo"){
                res.render('checkoutSpedizioneCasa', { title: 'Checkout' , prodotto: JSON.parse(req.body.product)});

              }else if(data == "Prodotto non disponibile"){
                fetch("http://localhost/php/progettoEcommerceSediRemote/Sede2/dbAcquistoSede2.php", {
                  method: "POST",
                  body: JSON.stringify(product)
                })
                .then(response => response.text())
                .then(data => {

                  console.log(data);
                  
                  if(data == "Prodotto acquistato con successo"){
                    res.render('checkoutSpedizioneCasa', { title: 'Checkout' , prodotto: JSON.parse(req.body.product)});
                  }else if(data == "Prodotto non disponibile"){
                    res.render('checkoutFallito', { title: 'Checkout'});
                  }else{
                    res.render('checkoutFallito', { title: 'Checkout'});
                  }
                });
              }else{
                res.render('checkoutFallito', { title: 'Checkout'});
              }
            });
          }
        });
      }
    })
  }else if(req.body.but=="negozio"){
    fetch('http://localhost:3010/aggiornaQuantita', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({product})
    })
    .then(response => {
      if(response.status === 200) {
        console.log("Prodotto acquistato");
        ritirabileInSede=1;
        res.render('checkOutRitiroNegozio', { title: 'Checkout' , prodotto: JSON.parse(req.body.product), ritirabileInSede: ritirabileInSede, ritirabileInSede1: ritirabileInSede1, ritirabileInNegozio1: ritirabileInNegozio1, ritirabileInNegozio2: ritirabileInNegozio2});
      }else{
        console.log("Prodotto non aggiornato");

        fetch('http://localhost:3020/aggiornaQuantita', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({product})
        })
        .then(response => {
          if(response.status === 200) {
            console.log("Prodotto acquistato");

            ritirabileInSede1=1;
            res.render('checkOutRitiroNegozio', { title: 'Checkout' , prodotto: JSON.parse(req.body.product), ritirabileInSede: ritirabileInSede, ritirabileInSede1: ritirabileInSede1, ritirabileInNegozio1: ritirabileInNegozio1, ritirabileInNegozio2: ritirabileInNegozio2});
          }else{
            ritirabileInSede=0;
            fetch("http://localhost/php/progettoEcommerceSediRemote/Sede1/dbAcquistoSede1.php", {
              method: "POST",
              body: JSON.stringify(product)
            })
            .then(response => response.text())
            .then(data => {
              console.log(data);
              if(data == "Prodotto acquistato con successo"){
                ritirabileInNegozio1=1;
                res.render('checkOutRitiroNegozio', { title: 'Checkout' , prodotto: JSON.parse(req.body.product), ritirabileInSede: ritirabileInSede, ritirabileInSede1: ritirabileInSede1, ritirabileInNegozio1: ritirabileInNegozio1, ritirabileInNegozio2: ritirabileInNegozio2});

              }else if(data == "Prodotto non disponibile"){
                ritirabileInNegozio1=0;
                fetch("http://localhost/php/progettoEcommerceSediRemote/Sede2/dbAcquistoSede2.php", {
                  method: "POST",
                  body: JSON.stringify(product)
                })
                .then(response => response.text())
                .then(data => {

                  console.log(data);
                  
                  if(data == "Prodotto acquistato con successo"){
                    ritirabileInNegozio2=1;
                    res.render('checkOutRitiroNegozio', { title: 'Checkout' , prodotto: JSON.parse(req.body.product), ritirabileInSede: ritirabileInSede, ritirabileInSede1: ritirabileInSede1, ritirabileInNegozio1: ritirabileInNegozio1, ritirabileInNegozio2: ritirabileInNegozio2});
                  }else if(data == "Prodotto non disponibile!"){
                    res.render('checkoutFallito', { title: 'Checkout'});
                  }else{
                    res.render('checkoutFallito', { title: 'Checkout'});
                  }
                });
              }else{
                res.render('checkoutFallito', { title: 'Checkout'});
              }
            });
          }
        });
      }
    });
  }
});

router.get('/checkout', function(req, res, next) {
  res.render('checkout', { title: 'checkout' });
});

module.exports = router;