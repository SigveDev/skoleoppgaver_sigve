class Character {
    constructor(navn, klasse, kjonn, vapen) {
        this.name = navn;
        this.gameClass = klasse;
        this.gender = kjonn;
        this.weapon = vapen;
    }

    setHealth() {
        this.health = 100;
        if(this.gameClass == "melee") {
            if(this.gender == "male") {
                this.health += 30;
            } else if(this.gender == "female") {
                this.health += 20;
            }
        } else if(this.gameClass == "range") {
            if(this.gender == "male") {
                this.health += 10;
            } else if(this.gender == "female") {
                this.health += 5;
            }
        } else if(this.gameClass == "magic") {
            if(this.gender == "male") {
                this.health -= 10;
            } else if(this.gender == "female") {
                this.health -= 20;
            }
        }
    }
}

let characterInfo;

function CharacterCustom() {
    characterInfo = new Character(document.getElementById("brukernavn").value, document.getElementById("klasse").value, document.getElementById("kjonn").value, document.getElementById("vapen").value);
    console.log(characterInfo);
    document.getElementById("customCharacter").style.display = "none";
    document.getElementById("gameMenu").style.display = "flex";
    characterInfo.setHealth();
    console.log(characterInfo.health);

    document.getElementById("nameOutput").innerHTML = characterInfo.name;
    document.getElementById("classOutput").innerHTML = characterInfo.gameClass;
    document.getElementById("genderOutput").innerHTML = characterInfo.gender;
    document.getElementById("healthOutput").innerHTML = characterInfo.health;
}