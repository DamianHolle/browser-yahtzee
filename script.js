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
const waardes = {1: 0, 2: 0, 3: 0, 4:0, 5: 0, 6: 0};
let rolls = 0;

//possible special scores
const fullHouseScore = 25;
const kleineStraatScore = 30;
const groteStraatScore = 40;
const topScore = 50;

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
    checkConsecutiveRolls();
}

function sumDices (diceRolls) {
    diceSum = diceRolls.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return diceSum;
}


//function checks for: Three of a kind, Full House, Carré, Yahtzee
function checkSameRolls() {
    for (let i = 0; i < 7; i++) {
        //check for three of a kind // Full House
        if (waardes[i] == 3) {
            //check for full house using another loop
            for (let j = 0; j < 7; j++) {
                //if a pair is found, full house score is given
                if (waardes[j] == 2) {
                    specialScores[2].innerText = fullHouseScore;
                    totaalScoreSpeciaal.innerText += fullHouseScore;
                    return;
                }
            }
            specialScores[0].innerText = countUpperTable();
            totaalScoreSpeciaal.innerText += countUpperTable();
            break;
        }
        //check for Carré // Yahtzee
        else if (waardes[i] >= 4) {
            if (waardes[i] == 5) {
                specialScores[5].innerText = topScore
                totaalScoreSpeciaal.innerText += topScore
                break;
            }
            specialScores[1].innerText = countUpperTable();
            totaalScoreSpeciaal.innerText += countUpperTable();
            break;
            }
    }
}


//function checks for: Kleine straat, Grote straat
function checkConsecutiveRolls () {
    //check for 4 or 5 consecutive numbers
    for (let i = 0; i < 7; i++) {
        if (waardes[1] == 1 && waardes[2] == 1 && waardes[3] == 1 && waardes[4] == 1) {
            if (waardes[5] == 1) {
                specialScores[4].innerText = groteStraatScore;
                totaalScoreSpeciaal.innerText += groteStraatScore;
                break;
            }
            specialScores[3].innerText = kleineStraatScore;
            totaalScoreSpeciaal.innerText += kleineStraatScore;
            break;
        }
    }
    countUpperTable();
    calculateTotalScore();
}

function countUpperTable () {
    let total = Object.entries(waardes).map(([key, value]) => key * value);
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