//setter klasse med satte parametere
/*class Klassenavn {
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

    finnOmkretsSirkel() {
        return (this.diameter * Math.PI);
    }

    finnArealSirkel() {
        return (Math.PI * this.radius * this.radius);
    }
}

class Sylinder extends Sirkel {
    constructor(radius, height) {
        super(radius);
        this.heigth = height;
    }

    finnVolum() {
        return this.finnArealSirkel() * this.heigth;
    }
}

//lager instans av klassen
let ita2 = new Klassenavn("Informasjonsteknnologi", "vg2");

function sirkel() {
    let minSirkel = new Sirkel(document.getElementById("radiusSirkel").value);
    let omkrets_av_sirkel = minSirkel.finnOmkretsSirkel();
    let areal_av_sirkel = minSirkel.finnArealSirkel();

    console.log(omkrets_av_sirkel.toFixed(2));
    console.log(areal_av_sirkel.toFixed(2));
}

function sylinder() {
    let SylinderInstance = new Sylinder(document.getElementById("radiusSylinder").value, document.getElementById("heightSylinder").value);
    let volum_av_sylinder = SylinderInstance.finnVolum();

    console.log(volum_av_sylinder.toFixed(2));
}*/



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
            document.getElementById("output_nameAndAge2").innerHTML = "";
        } else if(this.alder < 15) {
            document.getElementById("output_nameAndAge").innerHTML = "Hei, " + this.navn + "<br>" + "Du er " + this.alder + " år gammel.";
            document.getElementById("output_nameAndAge2").innerHTML = "Du er under den kriminelle lavalderen";
        } else if(this.alder >= 15 && this.alder < 18) {
            document.getElementById("output_nameAndAge").innerHTML = "Hei, " + this.navn + "<br>" + "Du er " + this.alder + " år gammel.";
            document.getElementById("output_nameAndAge2").innerHTML = "Du er over den kriminelle lavalderen";
        } else if(this.alder >= 18) {
            document.getElementById("output_nameAndAge").innerHTML = "Hei, " + this.navn + "<br>" + "Du er " + this.alder + " år gammel.";
            document.getElementById("output_nameAndAge2").innerHTML = "Du er over den kriminelle lavalderen, og du har stemerett";
        } else {
            document.getElementById("output_nameAndAge").innerHTML = "Hei, " + this.navn + "<br>" + "Du er " + this.alder + " år gammel.";
        }
    }
}

function navnOgAlder() {
    let dinAlder = new DinAlder(document.getElementById("name").value, document.getElementById("PreAge").value);
    dinAlder.finnAlder();
}

class Rektangel {
    constructor(length, width) {
        this.lengde = length;
        this.bredde = width;
        
        //ved å putte "+" forran variabel navnet blir det gjort om til et number fra string og da kan man plusse de sammen uten problemer
        this.Omkrets = (+length + +width) * 2;
        this.Areal = length * width;
    }

    sizeRektangel(sizeDiff) {
        this.lengde *= sizeDiff;
        this.bredde *= sizeDiff;

        this.Omkrets = (+this.lengde + +this.bredde) * 2;
        this.Areal = this.lengde * this.bredde;
    }
}

function rektangel() {
    let rektangel = new Rektangel(document.getElementById("lengthRektangel").value, document.getElementById("widthRektangel").value);
    document.getElementById("output_rektangel").innerHTML = "Rektangelet har lengden " + rektangel.lengde + " og bredden " + rektangel.bredde + "<br>" + "Omkretsen til rektangelet er " + rektangel.Omkrets + "<br>" + "Arealet til rektangelet er " + rektangel.Areal;
}

function rektangelSize() {
    let rektangel = new Rektangel(document.getElementById("lengthRektangel2").value, document.getElementById("widthRektangel2").value);
    let sizeDifference = rektangel.sizeRektangel(document.getElementById("sizeRektangel2").value);
    document.getElementById("output_rektangel2").innerHTML = "Høyde og bredde ble ganget med " + document.getElementById("sizeRektangel2").value + "<br>" + "Rektangelet har lengden " + rektangel.lengde + " og bredden " + rektangel.bredde + "<br>" + "Omkretsen til rektangelet er " + rektangel.Omkrets + "<br>" + "Arealet til rektangelet er " + rektangel.Areal;
}

//Oppgave 4.05 B: for å definere en motode i en klasse må vi først sende inn data når vi kjører klassen og sette motoden inni klassen til å være den verdien vi sender inn