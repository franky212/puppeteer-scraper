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
  console.log( game );
} );