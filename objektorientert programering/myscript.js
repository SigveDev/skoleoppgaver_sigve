//setter klasse med satte parametere
class Klassenavn {
    constructor(programfag, klassetrinn) {
        this.programfag = programfag;
        this.klassetrinn = klassetrinn;
    }
}

class Sirkel {
    constructor(radius) {
        this.radius = radius;
        this.diameter = radius * 2;
    }

    finnOmkrets() {
        return (this.diameter * Math.PI);
    }

    finnAreal() {
        return (Math.PI * this.radius * this.radius);
    }
}

//lager instans av klassen
let ita2 = new Klassenavn("Informasjonsteknnologi", "vg2");

function sirkel() {
    let minSirkel = new Sirkel(document.getElementById("radiusSirkel").value);

    let omkrets_av_sirkel = minSirkel.finnOmkrets();

    let areal_av_sirkel = minSirkel.finnAreal();

    console.log(omkrets_av_sirkel.toFixed(2));
    console.log(areal_av_sirkel.toFixed(2));
}