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

        if(this.gender == "chopper") {
            this.health = "999";
        }
    }
}

let characterInfo;

function CharacterCustom() {
    if(document.getElementById("kjonn").value != "chopper") {
        if(document.getElementById("klasse").value == "melee") {
            if(document.getElementById("vapen").value == "shortSword" || document.getElementById("vapen").value == "longSword") {
                canRun = true;
            } else {
                document.getElementById("characterCreatorErr").innerHTML = "As an melee class character, you cant use that weapon";
                canRun = false;
            }
        } else if(document.getElementById("klasse").value = "range"){
            if(document.getElementById("vapen").value == "bow" || document.getElementById("vapen").value == "crossBow") {
                canRun = true;
            } else {
                document.getElementById("characterCreatorErr").innerHTML = "As an range class character, you cant use that weapon";
                canRun = false;
            }
        } else if(document.getElementById("klasse").value == "magic") {
            if(document.getElementById("vapen").value == "wand" || document.getElementById("vapen").value == "staff") {
                canRun = true;
            } else {
                document.getElementById("characterCreatorErr").innerHTML = "As an magic class character, you cant use that weapon";
                canRun = false;
            }
        }
    } else {
        canRun = true;
    }

    if(document.getElementById("brukernavn").value == "") {
        document.getElementById("characterCreatorErr").innerHTML = "You need to name your character ;)";
        canRun = false;
    }

    if(canRun) {
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
}

function StartGame() {
    sessionStorage.setItem("username", characterInfo.name);
    sessionStorage.setItem("class", characterInfo.gameClass);
    sessionStorage.setItem("gender", characterInfo.gender);
    sessionStorage.setItem("startHealth", characterInfo.health);
    sessionStorage.setItem("weapon", characterInfo.weapon);
}