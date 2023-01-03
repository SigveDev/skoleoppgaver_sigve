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

class Sylinder extends Sirkel {
    constructor(radius, height) {
        super(radius);
        this.heigth = height;
    }

    finnVolum() {
        return this.finnAreal() * this.heigth;
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

function sylinder() {
    let SylinderInstance = new Sylinder(document.getElementById("radiusSylinder").value, document.getElementById("heightSylinder").value);
    let volum_av_sylinder = SylinderInstance.finnVolum();

    console.log(volum_av_sylinder.toFixed(2));
}

//Oppgaver:
class DinAlder {
    constructor(navn, foodselsaar) {
        this.navn = navn;
        this.foodselsaar = foodselsaar;
    }

    finnAlder() {
        this.alder = 2023 - this.foodselsaar;

        if(this.alder <= 0) {
            document.getElementById("output_nameAndAge").innerHTML = "Fødselsåret ditt kan ikke være i fremtiden";
        } else if(this.alder > 15) {
            document.getElementById("output_nameAndAge").innerHTML = "Hei, " + dinAlder.navn + "<br>" + "Du er " + dinAlder.finnAlder() + " år gammel.";
            document.getElementById("output_nameAndAge2").innerHTML = "Du er under den kriminelle lavalderen";
        } else {
            document.getElementById("output_nameAndAge").innerHTML = "Hei, " + dinAlder.navn + "<br>" + "Du er " + dinAlder.finnAlder() + " år gammel.";
        }
    }
}

function navnOgAlder() {
    let dinAlder = new DinAlder(document.getElementById("name").value, document.getElementById("PreAge").value);
    let age = dinAlder.finnAlder();
}