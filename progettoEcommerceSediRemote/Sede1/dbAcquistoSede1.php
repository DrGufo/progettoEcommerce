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

$prodotto = json_decode(file_get_contents("php://input"), true); // Decodifica l'oggetto JSON in un array associativo

$query = "UPDATE prodottiSede1 SET quantita = quantita - 1 WHERE id_Prodotto = ?";

$query = $connessione->prepare($query);

$query->bind_param("s", $prodotto["id_Prodotto"]);

$query->execute();

if($query->affected_rows == 0){
    echo "Prodotto non disponibile";
    exit();
}else{
    echo "Prodotto acquistato con successo";
}

$query->close();

$connessione->close();

exit();

?>
