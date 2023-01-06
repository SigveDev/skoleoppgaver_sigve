let circle = document.getElementById("player");
let moveBy = 5;

let characterInfo;
let startHealth;

//grunnlaget for movement er tatt fra youtube men jeg har endret basically alt
window.addEventListener( "load" , () => {
    circle.style.position = "absolute";
    circle.style.left = "5%";
    circle.style.top = "5%";

    document.getElementById("nameTagg").innerHTML = sessionStorage.getItem("username");

    characterInfo = new Character(sessionStorage.getItem("username"), sessionStorage.getItem("class"), sessionStorage.getItem("gender"), sessionStorage.getItem("weapon"), sessionStorage.getItem("startHealth"));
    startHealth = sessionStorage.getItem("startHealth");
    document.getElementById("health_indicator").innerHTML = characterInfo.health + " / " + startHealth;
    console.log(characterInfo);
});

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "a":
            if(circle.style.left <= "0%") {
                
            } else {
                circle.style.left = parseInt(circle.style.left) - moveBy + "%";
            }
            break;
        case "d":
            if(circle.style.left >= "95%") {
                
            } else {
                circle.style.left = parseInt(circle.style.left) + moveBy + "%";
            }
            break;
        case "w":
            if(circle.style.top <= "0%") {
                
            } else {
                circle.style.top = parseInt(circle.style.top) - moveBy + "%";
            }
            break;
        case "s" :
            if(circle.style.top >= "85%") {
                
            } else {
                circle.style.top = parseInt(circle.style.top) + moveBy + "%";
            }
            break;
    }
});

if(circle.style.top == "0%") {
    document.getElementById("nameTagg").style.top = "0px";
    console.log("top");
} else {
    document.getElementById("nameTagg").style.top = "-45px";
}

class Character {
    constructor(navn, klasse, kjonn, vapen, liv) {
        this.name = navn;
        this.gameClass = klasse;
        this.gender = kjonn;
        this.weapon = vapen;
        this.health = liv;
    }

    removeHealth(amount) {
        this.health -= amount;
    }

    addHealth(amount) {
        this.health += amount;
    }

    attack1() {
        switch (this.weapon) {
            case "shortSword":
                this.damage = 20;
                break;
            case "longSword":
                this.damage = 35;
                break;
            case "bow":
                this.damage = 10;
                break;
            case "crossBow":
                this.damage = 15;
                break;
            case "wand":
                this.damage = 5;
                break;
            case "staff":
                this.damage = 15;
        }
    }

    attack2() {
        switch (this.weapon) {
            case "shortSword":
                this.damage = 30;
                break;
            case "longSword":
                this.damage = 45;
                break;
            case "bow":
                this.damage = 15;
                break;
            case "crossBow":
                this.damage = 20;
                break;
            case "wand":
                this.damage = 10;
                break;
            case "staff":
                this.damage = 20;
        }
    }
}

function TakeDamage(amount) {
    characterInfo.removeHealth(amount);
    document.getElementById("health_indicator").innerHTML = characterInfo.health + " / " + startHealth;
    console.log(characterInfo.health);
}

function GetHealth(amount) {
    characterInfo.addHealth(amount);
    document.getElementById("health_indicator").innerHTML = characterInfo.health + " / " + startHealth;
    console.log(characterInfo.health);
}