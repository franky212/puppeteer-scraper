console.log( dbData );

const passCompletions = new Chart(document.getElementById('passCompletions'), {
  type: 'bar',
  data: {
      labels: ['2021 Pass Completions', '2022 Pass Completions'],
      datasets: [{
          data: [dbData['2021'].passCompletions, dbData['2022'].passCompletions],
          backgroundColor: [
              '#c00',
              '#c00'
          ],
          borderColor: [
              '#c00',
              '#c00'
          ],
          borderWidth: 1
      }]
  },
  options: {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const passAttempts = new Chart(document.getElementById('passAttempts'), {
  type: 'bar',
  data: {
      labels: ['2021 Pass Attempts', '2022 Pass Attempts'],
      datasets: [{
          data: [dbData['2021'].passAttempts, dbData['2022'].passAttempts],
          backgroundColor: [
              '#c00',
              '#c00'
          ],
          borderColor: [
              '#c00',
              '#c00'
          ],
          borderWidth: 1
      }]
  },
  options: {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});



dbData.games.forEach( game => {
  const container = document.getElementById('game-panel-container');

  let gamePanelHtml = '<div class="drop-shadow flex game-panel items-center text-white justify-evenly">';

  gamePanelHtml += '<div class="text-center">';
  gamePanelHtml += `<h2 id="utahScore" class="text-4xl font-black">${game.utah_score !== 0 ? game.utah_score : 'TBA'}</h2>`;
  gamePanelHtml += '<h3 id="utah" class="text-xl uppercase font-black">Utah</h3>';
  gamePanelHtml += '</div>';

  gamePanelHtml += '<div class="text-center">';
  gamePanelHtml += '<h2 class="text-4xl uppercase font-black game-versus">VS</h2>';
  gamePanelHtml += `<h3 class="text-2xl uppercase font-black">${game.date}</h3>`;
  gamePanelHtml += `<p class="text-md font-black">${game.win ? 'Win' : (!game.gameHappened ? 'TBA' : 'Loss')}</p>`;
  gamePanelHtml += '</div>';

  gamePanelHtml += '<div class="text-center">';
  gamePanelHtml += `<h2 id="opponentScore" class="text-4xl font-black">${game.opponent_points !== 0 ? game.opponent_points : 'TBA'}</h2>`;
  gamePanelHtml += `<h3 id="opponent" class="text-xl uppercase font-black">${game.opponent}</h3>`;
  gamePanelHtml += '</div>';

  gamePanelHtml += '</div>';

  container.insertAdjacentHTML('beforeend', gamePanelHtml);
} );