# Progetto E-Commerce Distribuito

Applicazione web e-commerce sviluppata con architettura distribuita, composta da un servizio principale, due microservizi di magazzino e due sedi remote esposte tramite endpoint PHP.

Il progetto dimostra una gestione ibrida dei dati:
- MongoDB per utenti e inventario delle sedi principali.
- MySQL per inventario delle sedi remote.

## Obiettivi del progetto

- Aggregazione catalogo prodotti da piu sorgenti dati.
- Gestione operazioni CRUD su prodotti per sede.
- Flussi di acquisto con fallback tra magazzini principali e remoti.
- Distinzione ruoli utente standard/admin in fase di login.

## Architettura

- `eCommerceMain` (porta `3000`): front-end server-side (Express + Jade), orchestrazione chiamate verso i servizi di magazzino e sedi remote.
- `eCommerceMagazzino1` (porta `3010`): API MongoDB (collection `prodottiSede1` + `utenti`).
- `eCommerceMagazzino2` (porta `3020`): API MongoDB (collection `prodottiSede2`).
- `progettoEcommerceSediRemote/Sede1` e `Sede2`: endpoint PHP/MySQL raggiunti dal main tramite URL sotto `http://localhost/php/...`.

## Stack tecnologico

- Node.js + Express
- Jade (templating)
- MongoDB (`mongodb://localhost:27017`)
- MySQL + PHP (MySQLi)
- CORS e API REST

## Prerequisiti

- Node.js 18+ (consigliato per disponibilita nativa di `fetch` lato server)
- npm
- MongoDB Server + `mongosh`
- MySQL Server
- Web server PHP locale (es. XAMPP/WAMP) con Apache attivo

## 1) Setup MySQL (creazione e popolamento)

### 1.1 Creazione database e tabelle

Il file SQL di riferimento e:

- `progettoEcommerce/db/dbecommerce.sql`

Esegue creazione database, tabelle `prodottisede1` e `prodottisede2`, chiavi primarie e dati iniziali.

Esempio import da terminale:

```bash
mysql -u root -p < progettoEcommerce/db/dbecommerce.sql
```

### 1.2 Nota importante sul nome database

Gli script PHP usano il nome database `dbECommerce`.
Il file SQL crea `dbecommerce`.

Su installazioni Windows standard di MySQL la differenza maiuscole/minuscole in genere non crea problemi. In ambienti case-sensitive, allineare i nomi in uno dei due modi:

- modificare nei file PHP `$database = "dbECommerce"` in `dbecommerce`, oppure
- creare/importare il DB con il nome `dbECommerce`.

### 1.3 Setup endpoint PHP remoti

Il servizio `eCommerceMain` invoca le sedi remote su URL come:

- `http://localhost/php/progettoEcommerceSediRemote/Sede1/dbSede1.php`
- `http://localhost/php/progettoEcommerceSediRemote/Sede2/dbSede2.php`

Per rispettare questi path, posizionare la cartella `progettoEcommerceSediRemote` in una directory esposta da Apache sotto `/php`.

Esempio tipico (XAMPP su Windows):

- `C:\xampp\htdocs\php\progettoEcommerceSediRemote\...`

## 2) Setup MongoDB (creazione e popolamento)

I microservizi MongoDB usano il database `progettoEcommerce` e le collection:

- `utenti`
- `prodottiSede1`
- `prodottiSede2`

Aprire `mongosh` ed eseguire:

```javascript
use progettoEcommerce

db.utenti.insertMany([
	{ email: "admin", password: "admin" },
	{ email: "utente@example.com", password: "password123" }
])

db.prodottiSede1.insertMany([
	{ categoria: "tecnologia", descrizione: "iphone 14", prezzo: 1000, quantita: 5 },
	{ categoria: "tecnologia", descrizione: "laptop", prezzo: 1500, quantita: 3 },
	{ categoria: "tecnologia", descrizione: "smartwatch", prezzo: 300, quantita: 10 }
])

db.prodottiSede2.insertMany([
	{ categoria: "tecnologia", descrizione: "webcam", prezzo: 50, quantita: 10 },
	{ categoria: "tecnologia", descrizione: "stampante", prezzo: 200, quantita: 6 },
	{ categoria: "tecnologia", descrizione: "tablet", prezzo: 500, quantita: 8 }
])
```

Nota: l'utente `admin/admin` abilita il percorso amministratore nel login.

## 3) Installazione dipendenze Node.js

Eseguire `npm install` in ciascun servizio:

```bash
cd progettoEcommerce/eCommerceMain && npm install
cd ../eCommerceMagazzino1 && npm install
cd ../eCommerceMagazzino2 && npm install
```

## 4) Avvio del progetto

Avviare MongoDB, MySQL e Apache/PHP, poi avviare i tre servizi Node in terminali separati:

```bash
cd progettoEcommerce/eCommerceMagazzino1 && npm start
```

```bash
cd progettoEcommerce/eCommerceMagazzino2 && npm start
```

```bash
cd progettoEcommerce/eCommerceMain && npm start
```

Accesso applicazione:

- Main app: `http://localhost:3000`
- Magazzino 1 API: `http://localhost:3010`
- Magazzino 2 API: `http://localhost:3020`

## 5) Flusso di utilizzo suggerito

- Registrazione utente (`/signUp`) o accesso (`/login`).
- Navigazione catalogo aggregato (`/visualizza`).
- Simulazione acquisto con spedizione o ritiro.
- Operazioni admin (`/operazioni`) per inserimento, modifica e cancellazione prodotti.

## Struttura repository (sintesi)

- `progettoEcommerce/eCommerceMain`: orchestratore e interfaccia web
- `progettoEcommerce/eCommerceMagazzino1`: servizi MongoDB sede principale 1
- `progettoEcommerce/eCommerceMagazzino2`: servizi MongoDB sede principale 2
- `progettoEcommerce/db/dbecommerce.sql`: schema/dati iniziali MySQL
- `progettoEcommerceSediRemote/`: endpoint PHP per sedi remote MySQL

## Note finali

Questo progetto e stato realizzato con finalita didattico-progettuali per mostrare integrazione multi-servizio e multi-database in uno scenario e-commerce distribuito.