var ritiroSede = document.getElementById("ritiroSede");
var ritiroSede1 = document.getElementById("ritiroSede1");
var ritiroNegozio1 = document.getElementById("ritiroNegozio1");
var ritiroNegozio2 = document.getElementById("ritiroNegozio2");
var divInfo= document.getElementById("infoRitiro");

if(ritiroSede.value == "1"){
    divInfo.innerHTML = "Il prodotto può essere ritirato presso il magazzino della nostra sede."
}else if(ritiroSede1.value == "1"){
    divInfo.innerHTML = "Il prodotto può essere ritirato presso il magazzino della nostra sede 1."
}else if (ritiroNegozio1.value == "1"){
    divInfo.innerHTML = "Il prodotto può essere ritirato presso il negozio selezionato."
}else if(ritiroNegozio2.value == "1"){
    divInfo.innerHTML = "Il prodotto può essere ritirato presso il negozio selezionato."
}else{
    divInfo.innerHTML = "Il prodotto non è disponibile in nessun negozio."
}