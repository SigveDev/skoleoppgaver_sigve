function kvadrat(lengde, bredde){
    let areal = lengde * bredde;
    console.log(areal);
}

function trekant(lengde, bredde){
    let areal = (lengde * bredde) / 2;
    console.log(areal);
}

function areal(lengde, bredde){
    kvadrat(lengde, bredde);
    trekant(lengde, bredde);
}

function spraak(){
    let lang = document.getElementById("input").value;
    if (lang == "n"){
        document.getElementById("output").innerHTML = "Du er Norsk";
    } else if (lang == "s"){
        document.getElementById("output").innerHTML = "Du er Svansk";
    } else if (lang == "d"){
        document.getElementById("output").innerHTML = "Du er Dansk";
    } else {
        document.getElementById("output").innerHTML = "Skriv inn n for Norge, s for Sverige eller d for Danmark";
    }
}

var randome;

function oppgave4(){
    randome = Math.floor(Math.random() * 51);
    console.log(randome);
}

function gjett(){
    var gjettet = document.getElementById("input3").value;
    if(gjettet == randome){
        document.getElementById("gjettSvar").innerHTML = "Riktig, svaret var: " + randome;
    } else if (gjettet > randome) {
        document.getElementById("gjettSvar").innerHTML = "For høyt";
    } else if (gjettet < randome) {
        document.getElementById("gjettSvar").innerHTML = "For lavt";
    }
}