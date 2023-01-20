class Joker{
    constructor(name) {
        this.name = name;
        this.middle = []; //5 tall
        this.answers = []; //5 tall
        this.index = 0;
        this.randomJoker = 0;
        this.joker = 0;
    }
    
    startGame() {
        for (let i = 0; i < 5; i++) {
            let randomMiddle = Math.floor(Math.random() * 10);
            let randomAnswers = Math.floor(Math.random() * 10)

            this.randomJoker = Math.floor(Math.random() * 100);

            this.middle.push(randomMiddle);
            this.answers.push(randomAnswers);

            document.getElementById("btn" + i.toString()).innerHTML = randomMiddle.toString();

            document.getElementById("up" + i.toString()).classList.remove("joker");
            document.getElementById("down" + i.toString()).classList.remove("joker");
        }

        document.getElementById("up0").classList.remove("circleDisabled");
        document.getElementById("down0").classList.remove("circleDisabled");
        document.getElementById("btn0").classList.remove("circleDisabled");

        document.getElementById("up0").classList.remove("circleRight");
        document.getElementById("up0").classList.remove("circleWrong");
        document.getElementById("down0").classList.remove("circleRight");
        document.getElementById("down0").classList.remove("circleWrong");

        document.getElementById("up" + this.index).classList.add("active");
        document.getElementById("down" + this.index).classList.add("active");

        document.getElementById("up0").innerHTML = "";
        document.getElementById("down0").innerHTML = "";

        for (let i = 1; i < 5; i++) {
            document.getElementById("up" + i.toString()).classList.add("circleDisabled");
            document.getElementById("down" + i.toString()).classList.add("circleDisabled");
            document.getElementById("btn" + i.toString()).classList.remove("circleDisabled");

            document.getElementById("up" + i.toString()).classList.remove("circleRight");
            document.getElementById("up" + i.toString()).classList.remove("circleWrong");
            document.getElementById("down" + i.toString()).classList.remove("circleRight");
            document.getElementById("down" + i.toString()).classList.remove("circleWrong");

            document.getElementById("up" + i.toString()).innerHTML = "";
            document.getElementById("down" + i.toString()).innerHTML = "";
        }

        this.playGame();
    }

    playGame() {
        //sjekk om spillet er slutt
        if(this.index == 5) {
            console.log("Du er ferdig med spillet!");
        } else {
            document.getElementById("up" + this.index).classList.add("active");
            document.getElementById("down" + this.index).classList.add("active");

            document.getElementById("up" + this.index).classList.remove("circleDisabled");
            document.getElementById("down" + this.index).classList.remove("circleDisabled");
            document.getElementById("btn" + this.index).classList.remove("circleDisabled");

            document.querySelectorAll(".top").forEach(item => {
                item.onclick = () => {
                    if(item.classList.contains("active")) {
                        if(this.middle[this.index] <= this.answers[this.index]) {
                            this.joker = Math.floor(Math.random() * 100);
                            if(this.joker === this.randomJoker) {
                                this.jokerFunc("up");
                            } else {
                                this.rightCircle("up");
                            }
                        } else if(this.answers[this.index] < this.middle[this.index]) {
                            this.wrongCircle("up");
                        }
                    }
                }
            })
            document.querySelectorAll(".bottom").forEach(item => {
                item.onclick = () => {
                    if(item.classList.contains("active")) {
                        if(this.middle[this.index] >= this.answers[this.index]) {
                            this.joker = Math.floor(Math.random() * 100);
                            if(this.joker === this.randomJoker) {
                                this.jokerFunc("down");
                            } else {
                                this.rightCircle("down");
                            }
                        } else if(this.answers[this.index] > this.middle[this.index]) {
                            this.wrongCircle("down");
                        }
                    }
                }
            })
        }
    }

    rightCircle(upOrDown) {
        document.getElementById(upOrDown + this.index).innerHTML = this.answers[this.index];
        document.getElementById(upOrDown + this.index).classList.add("circleRight");

        if(upOrDown == "up") {
            document.getElementById("down" + this.index).classList.add("circleDisabled");
        } else if (upOrDown == "down") {
            document.getElementById("up" + this.index).classList.add("circleDisabled");
        }
        document.getElementById("btn" + this.index).classList.add("circleDisabled");


        document.getElementById("up" + this.index).classList.remove("active");
        document.getElementById("down" + this.index).classList.remove("active");
        this.index++;
        this.playGame();
    }

    wrongCircle(upOrDown) {
        document.getElementById(upOrDown + this.index).innerHTML = this.answers[this.index];
        document.getElementById(upOrDown + this.index).classList.add("circleWrong");

        if(upOrDown == "up") {
            document.getElementById("down" + this.index).classList.add("circleDisabled");
        } else if (upOrDown == "down") {
            document.getElementById("up" + this.index).classList.add("circleDisabled");
        }
        document.getElementById("btn" + this.index).classList.add("circleDisabled");

        document.getElementById("up" + this.index).classList.remove("active");
        document.getElementById("down" + this.index).classList.remove("active");
        this.index++;
        this.playGame();
    }

    jokerFunc(upOrDown) {
        document.getElementById(upOrDown + this.index).classList.add("joker");

        if(upOrDown == "up") {
            document.getElementById("down" + this.index).classList.add("circleDisabled");
        } else if (upOrDown == "down") {
            document.getElementById("up" + this.index).classList.add("circleDisabled");
        }
        document.getElementById("btn" + this.index).classList.add("circleDisabled");

        document.getElementById("up" + this.index).classList.remove("active");
        document.getElementById("down" + this.index).classList.remove("active");
        this.index = 5;
    }
}

let jokerGame;

window.onload = function() {
    jokerGame = new Joker("Sigve");
    jokerGame.startGame();
}

document.getElementById("startButton").onclick = (e) => {
    jokerGame = new Joker("Sigve");
    jokerGame.startGame();
}