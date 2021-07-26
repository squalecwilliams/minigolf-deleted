const allHighScoresList = document.getElementById('allHighScoresList')
const allHighScores = JSON.parse(localStorage.getItem('allHighScores')) || []

allHighScoresList.innerHTML = allHighScores.map( score => {
    return `<li class='high-score'> ${score.name} - ${score.score} </li>`
}).join('');    