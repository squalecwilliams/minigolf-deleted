const username = document.getElementById("username")
const saveScoreBtn = document.getElementById("saveScoreBtn")
const finalScore = document.getElementById("finalScore")
const mostRecentScore = localStorage.getItem("mostRecentScore")



const highScores = JSON.parse(localStorage.getItem("highScores")) || []; 

const allHighScores = JSON.parse(localStorage.getItem("allHighScores")) || []; 

const MAX_HIGH_SCORES = 5;

//console.log(highScores);

finalScore.innerText = mostRecentScore;


username.addEventListener('keyup', () => {
    //console.log(username.value)
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    console.log("Clicked Save Button")
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value,
    };

    console.log(score)

    highScores.push(score)
    highScores.sort( (a, b) => a.score - b.score)

    allHighScores.push(score)
    allHighScores.sort( (a, b) => a.score - b.score)

    highScores.splice(5)

    localStorage.setItem("highScores", JSON.stringify(highScores))
    localStorage.setItem("allHighScores", JSON.stringify(allHighScores))

    saveScoreBtn.disabled = username.value

    //window.location.assign("file:///Users/alecwilliams/code/my-own-project/MOP-code/Index.html")

    //console.log(highScores)
}