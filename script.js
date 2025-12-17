const knop = document.getElementById('gooiknop');
const resetKnop = document.getElementById('resetknop');
const worpTabel = document.getElementById('worp-score')
const worpCells = worpTabel.getElementsByTagName('td');
const diceIcons = document.getElementsByTagName('span');
const scoreDetector = document.getElementById('score-detector');
const scoreTabel1 = document.getElementById('score-tabel-deel1');
const scoreCells = scoreTabel1.getElementsByClassName('losse-score');
const totaalScoreLos = document.getElementById('totaalscore-losse');
const totaalScoreSpeciaal = document.getElementById('totaalscore-speciale');
const totaalScoreBeide = document.getElementById('totaalscore-beide');
const specialScores = document.getElementsByClassName('speciale-score');
var waardes = {1: 0, 2: 0, 3: 0, 4:0, 5: 0, 6: 0};
let rolls = 0;


knop.addEventListener('click', worp);
resetKnop.addEventListener('click', reset);


function reset () {
    location.reload();
}

function worp() {
    rolls++;
    if (rolls > 1) {
        alert("Je hebt al dobbelstenen gegooid!");
        return;
    }
    let gegooideWaardes = [];
    for (let i = 0; i < 5; i++) {
        let ranNum = Math.floor(Math.random() * 6) + 1;
        gegooideWaardes.push(ranNum);
        waardes[ranNum]++;
        worpCells[ranNum - 1].innerText++;
        diceIcons[i].innerHTML = '&#' + (9855 + ranNum);
    }
    sumDices(gegooideWaardes);
    checkSameRolls();
}

function sumDices (diceRolls) {
    diceSum = diceRolls.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return diceSum;
}

function checkSameRolls() {
    console.log(waardes);
    for (let i = 0; i < 7; i++) {
        if (waardes[i] == 5) {
            console.log('Yahtzee!')
            scoreDetector.innerText += "Yahtzee!";
            specialScores[5].innerText = 50
            totaalScoreSpeciaal.innerText += 50
        }
        if (waardes[i] == 4) {
            console.log('Carré');
            scoreDetector.innerText += "Carré";
            specialScores[1].innerText = countUpperTable();
            totaalScoreSpeciaal.innerText += countUpperTable();
        }
        if (waardes[i] == 3) {
            for (let j = 0; j < 7; j++) {
                if(waardes[j] == 2) {
                    console.log("Full House!");
                    scoreDetector.innerText += "Full House";
                    specialScores[2].innerText = 25
                    totaalScoreSpeciaal.innerText += 25
                    break;
                }
                if (j >= 6) {
                    console.log("Three of a kind");
                    scoreDetector.innerText +="Three of a kind";
                    specialScores[0].innerText = countUpperTable();
                    totaalScoreSpeciaal.innerText += countUpperTable();
                }
            }
        }
        if (waardes[1] == 1 && waardes[2] == 1 && waardes[3] == 1 && waardes[4] == 1) {
            if (waardes[5] == 1) {
                console.log("Grote straat, vijf opeenvolgende nummers!");
                scoreDetector.innerText += "Grote straat!";
                specialScores[4].innerText = 40
                totaalScoreSpeciaal.innerText += 40
                break;
            }
            else {
                console.log("Kleine straat, vier opeenvolgende nummers")
                scoreDetector.innerText += "Kleine straat!";
                specialScores[3].innerText = 30
                totaalScoreSpeciaal.innerText += 30
            }
        }
    }
    countUpperTable();
    calculateTotalScore();
}

function countUpperTable () {
    let total = Object.entries(waardes).map(([key, value]) => key * value);
    console.log(total);

    for (let i = 0; i < total.length; i++) {
        scoreCells[i].innerText = total[i];
    }
    return totaalScoreLos.innerText = total.reduce((totaalScoreDeel1, total) => totaalScoreDeel1 + total, 0);
}

function calculateTotalScore() {
    let totalScoreTop = countUpperTable();
    if (totaalScoreSpeciaal.innerHTML.length > 0) {
        let totalScoreBottom = parseInt(totaalScoreSpeciaal.innerHTML);
        totaalScoreBeide.innerText = totalScoreTop + totalScoreBottom;
    }
    else {
        specialScores[6].innerText = totalScoreTop;
        totaalScoreBeide.innerText = totalScoreTop + totalScoreTop;
    }
}