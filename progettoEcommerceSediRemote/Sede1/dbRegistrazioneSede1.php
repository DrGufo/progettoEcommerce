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

// Acquisizione dei dati inviati con metodo POST

$dati = json_decode(file_get_contents("php://input"), true);

$queryGetId = "SELECT id_Prodotto FROM prodottisede1";

$queryGetId = $connessione->prepare($queryGetId);

$queryGetId->execute();

$result = $queryGetId->get_result();

$result= $result->fetch_all(MYSQLI_ASSOC);

$ids = array();

foreach($result as $row){
    $row['id_Prodotto'] = substr($row['id_Prodotto'], 0, -2);
    $ids[] = $row['id_Prodotto'];
}

$maxId = max($ids);

$maxId++;

$maxId = $maxId."S1";

$query = "INSERT INTO prodottisede1 (id_Prodotto, categoria, descrizione, prezzo, quantita) VALUES (?, ?, ?, ?, ?)";

$query = $connessione->prepare($query);

$query->bind_param("sssss", $maxId, $dati['categoria'], $dati['prodotto'], $dati['prezzo'], $dati['quantita']);

$query->execute();

$result = $query->get_result();

echo "Prodotto inserito con successo";

// Chiusura della connessione 
$connessione->close();
?>