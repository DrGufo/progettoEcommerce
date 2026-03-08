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

$prodotto = json_decode(file_get_contents("php://input"), true);

$qtQuery = "SELECT quantita FROM prodottiSede1 WHERE id_Prodotto = ?";

$qtQuery = $connessione->prepare($qtQuery);

$qtQuery->bind_param("s", $prodotto["id_Prodotto"]);

$qtQuery->execute();

$result=$qtQuery->get_result();

$result=$result->fetch_assoc();

$qtQuery->close();

$qt = $result["quantita"];

if($qt > 0){
    $qt = $qt - 1;
    $query = "UPDATE prodottiSede1 SET quantita = ? WHERE id_Prodotto = ?";

    $query = $connessione->prepare($query);

    $query->bind_param("is", $qt, $prodotto["id_Prodotto"]);

    $query->execute();

    $query->close();

    $connessione->close();

    echo ("Prodotto acquistato con successo!");
}
else{
    $connessione->close();

    echo ("Prodotto non disponibile!");
}

?>