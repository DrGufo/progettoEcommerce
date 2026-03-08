<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Parametri di connessione al database
$hostname = "localhost"; // Indirizzo del server del database
$username = "root";    // Nome utente del database
$database = "dbECommerce";   // Nome del database

// Creazione di una connessione a MySQL usando MySQLi
$connessione = new mysqli($hostname, $username, "" , $database);

// Verifica della connessione
if ($connessione->connect_error) {
    die("Connessione fallita: " . $connessione->connect_error);
}

$query = "SELECT * FROM prodottiSede2";

$query = $connessione->prepare($query);

$query->execute();

$result = $query->get_result();

// Verifica se la query ha avuto successo
if ($result) {
    // Verifica se la query ha restituito dei dati
    if ($result->num_rows > 0) {

        $jsonProdotti = json_encode($result->fetch_all(MYSQLI_ASSOC));

        echo $jsonProdotti;
        
    } else {
        echo "Nessun prodotto disponibile";
    }
} else {
    echo "Errore nella query: " . $connessione->error;
}

// Chiusura della connessione 
$connessione->close();
?>