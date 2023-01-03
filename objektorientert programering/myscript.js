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
}

//lager instans av klassen
let ita2 = new Klassenavn("Informasjonsteknnologi", "vg2");

let minSirkel = new Sirkel(3);

let omkrets_av_sirkel = minSirkel.finnOmkrets();

console.log(omkrets_av_sirkel.toFixed(2));