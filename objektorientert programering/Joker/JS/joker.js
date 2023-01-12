class Joker{
    constructor(name) {
        this.name = name;
        this.middle = []; //5 tall
        this.answers = []; //5 tall
        this.index = 0;
    }
    
    startGame() {
        for (let i = 0; i < 5; i++) {
            let randomMiddle = Math.floor(Math.random() * 10);
            let randomAnswers = Math.floor(Math.random() * 10)

            this.middle.push(randomMiddle);
            this.answers.push(randomAnswers);

            document.getElementById("btn" + i.toString()).innerHTML = randomMiddle.toString();
        }

        document.getElementById("up0").disabled = false;
        document.getElementById("down0").disabled = false;
        document.getElementById("btn0").disabled = false;

        document.getElementById("up0").classList.remove("circleRight");
        document.getElementById("up0").classList.remove("circleWrong");
        document.getElementById("down0").classList.remove("circleRight");
        document.getElementById("down0").classList.remove("circleWrong");

        document.getElementById("up0").innerHTML = "";
        document.getElementById("down0").innerHTML = "";

        for (let i = 1; i < 5; i++) {
            document.getElementById("up" + i.toString()).disabled = true;
            document.getElementById("down" + i.toString()).disabled = true;
            document.getElementById("btn" + i.toString()).disabled = false;

            document.getElementById("up" + i.toString()).classList.remove("circleRight");
            document.getElementById("up" + i.toString()).classList.remove("circleWrong");
            document.getElementById("down" + i.toString()).classList.remove("circleRight");
            document.getElementById("down" + i.toString()).classList.remove("circleWrong");

            document.getElementById("up" + i.toString()).innerHTML = "";
            document.getElementById("down" + i.toString()).innerHTML = "";
        }
    }

    playGame() {
        //sjekk om spillet er slutt
        if(this.index == 5) {
            console.log("Du er ferdig med spillet!");
        } else {
            document.getElementById("up" + this.index).onclick = () => {
                if(this.middle[this.index] == this.answers[this.index]) {
                    document.getElementById("up" + this.index).innerHTML = this.answers[this.index];
                    document.getElementById("up" + this.index).classList.add("circleRight");

                    document.getElementById("down" + this.index).disabled = true;
                    document.getElementById("btn" + this.index).disabled = true;

                    this.index++;
                    this.playGame();

                    document.getElementById("up" + this.index).disabled = false;
                    document.getElementById("down" + this.index).disabled = false;
                    document.getElementById("btn" + this.index).disabled = false;
                } else if(this.answers[this.index] > this.middle[this.index]) {
                    document.getElementById("up" + this.index).innerHTML = this.answers[this.index];
                    document.getElementById("up" + this.index).classList.add("circleRight");

                    document.getElementById("down" + this.index).disabled = true;
                    document.getElementById("btn" + this.index).disabled = true;

                    this.index++;
                    this.playGame();

                    document.getElementById("up" + this.index).disabled = false;
                    document.getElementById("down" + this.index).disabled = false;
                    document.getElementById("btn" + this.index).disabled = false;
                } else if(this.answers[this.index] < this.middle[this.index]) {
                    document.getElementById("down" + this.index).innerHTML = this.answers[this.index];
                    document.getElementById("down" + this.index).classList.add("circleWrong");

                    document.getElementById("up" + this.index).disabled = true;
                    document.getElementById("btn" + this.index).disabled = true;

                    this.index++;
                    this.playGame();

                    document.getElementById("up" + this.index).disabled = false;
                    document.getElementById("down" + this.index).disabled = false;
                document.getElementById("btn" + this.index).disabled = false;
                }
            }
            document.getElementById("down" + this.index).onclick = () => {
                if(this.middle[this.index] == this.answers[this.index]) {
                    document.getElementById("down" + this.index).innerHTML = this.answers[this.index];
                    document.getElementById("down" + this.index).classList.add("circleRight");

                    document.getElementById("up" + this.index).disabled = true;
                    document.getElementById("btn" + this.index).disabled = true;
    
                    this.index++;
                    this.playGame();
    
                    document.getElementById("up" + this.index).disabled = false;
                    document.getElementById("down" + this.index).disabled = false;
                    document.getElementById("btn" + this.index).disabled = false;
                } else if(this.answers[this.index] > this.middle[this.index]) {
                    document.getElementById("up" + this.index).innerHTML = this.answers[this.index];
                    document.getElementById("up" + this.index).classList.add("circleWrong");

                    document.getElementById("down" + this.index).disabled = true;
                    document.getElementById("btn" + this.index).disabled = true;

                    this.index++;
                    this.playGame();

                    document.getElementById("up" + this.index).disabled = false;
                    document.getElementById("down" + this.index).disabled = false;
                    document.getElementById("btn" + this.index).disabled = false;
                } else if(this.answers[this.index] < this.middle[this.index]) {
                    document.getElementById("down" + this.index).innerHTML = this.answers[this.index];
                    document.getElementById("down" + this.index).classList.add("circleRight");

                    document.getElementById("up" + this.index).disabled = true;
                    document.getElementById("btn" + this.index).disabled = true;

                    this.index++;
                    this.playGame();

                    document.getElementById("up" + this.index).disabled = false;
                    document.getElementById("down" + this.index).disabled = false;
                    document.getElementById("btn" + this.index).disabled = false;
                }
            }
        }
    }
}

let jokerGame;

document.getElementById("startButton").onclick = (e) => {
    jokerGame = new Joker("Sigve");
    jokerGame.startGame();
    jokerGame.playGame();
}