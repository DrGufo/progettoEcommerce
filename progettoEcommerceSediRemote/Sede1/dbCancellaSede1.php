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

$query = "DELETE FROM prodottiSede1 WHERE categoria = ? AND descrizione = ?";

$query = $connessione->prepare($query);

$query->bind_param("ss", $prodotto["categoria"], $prodotto["prodotto"]);

$query->execute();

if($query->affected_rows == 0){
    echo "Prodotto non disponibile";
    exit();
}else{
    echo "Prodotto cancellato con successo";
}

$query->close();

$connessione->close();

exit();
?>