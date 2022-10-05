const puppeteer = require('puppeteer-extra');
const { writeFile } = require('fs').promises;

/*************************************
 * THIS IS WHAT MAKES IT WORK
 * SHOUT OUT JORDAN HANSEN - https://cobaltintelligence.com/blog/avoid-being-blocked-with-puppeteer/
 * ALSO ANOTHER WAY TO BLOCK ALL ADS IS TO INTERCEPT ALL REQUESTS, AND FILTER ALL REQUESTS FOR THESE DOMAINS:
 * https://winhelp2002.mvps.org/hosts.txt
 * Example Code:
 * //now we read the host file
    var hostFile = fs.readFileSync('hosts.txt', 'utf8').split('\n');
    var hosts = {};
    for (var i = 0; i < hostFile.length; i++) {
        var frags = hostFile[i].split(' ');
        if (frags.length > 1 && frags[0] === '0.0.0.0') {
            hosts[frags[1].trim()] = true;
        }
    }
 * page.on('request', request => {
        var domain = null;
        if (task.input.blockads) {
            var frags = request.url().split('/');
            if (frags.length > 2) {
                domain = frags[2];
            }
        }
        if ((task.input.blockads && hosts[domain] === true) || (!task.input.includephotos && request.resourceType() === 'image')) {
            request.abort();
        }
        else {
            request.continue();
        }
    });
*************************************/
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
/************************************/

puppeteer
  .use(AdblockerPlugin({blockTrackers: true}))
  .launch({headless: false})
  .then( async browser => {

    const schedulePage = await browser.newPage();
    await schedulePage.goto('https://www.sports-reference.com/cfb/schools/utah/2022-schedule.html');

    const previousYearStatisticsPage = await browser.newPage();
    await previousYearStatisticsPage.goto('https://www.sports-reference.com/cfb/schools/utah/2021.html');

    const currentYearStatisticsPage = await browser.newPage();
    await currentYearStatisticsPage.goto('https://www.sports-reference.com/cfb/schools/utah/2022.html');

    // START BUILDING THE DATA PER PAGE

    // Previous years statistics
    const previousYearStatistics = await previousYearStatisticsPage.evaluate( () => {
      let team = {
        2021: {}
      };

      let passCompletion = document.querySelector( '.stats_table tr[data-row="0"] td[data-stat="pass_cmp"]' );
      let passAttempts = document.querySelector( '.stats_table tr[data-row="0"] td[data-stat="pass_att"]' );
      team[2021].passCompletions = Number(passCompletion.textContent);
      team[2021].passAttempts = Number(passAttempts.textContent);

      return team;
    } );

    // Current years statistics
    const currentYearStatistics = await currentYearStatisticsPage.evaluate( () => {
      let team = {
        2022: {}
      };

      let passCompletion = document.querySelector( '.stats_table tr[data-row="0"] td[data-stat="pass_cmp"]' );
      let passAttempts = document.querySelector( '.stats_table tr[data-row="0"] td[data-stat="pass_att"]' );
      team[2022].passCompletions = Number(passCompletion.textContent);
      team[2022].passAttempts = Number(passAttempts.textContent);

      return team;
    } );

    const scheduleResults = await schedulePage.evaluate( (() => {
      // Initialize data object
      let team = {
        games: []
      };

      // Grab HTML Nodes from the document
      let dates = document.querySelectorAll( '#schedule td[data-stat="date_game"]' );
      let opponents = document.querySelectorAll( '#schedule td[data-stat="opp_name"]' );
      let utah_score = document.querySelectorAll( '#schedule td[data-stat="points"]' );
      let opponent_points = document.querySelectorAll( '#schedule td[data-stat="opp_points"]' );

      // Loop through the HTML Nodes, and push the textContent to the Team Games array!
      // Example:
      // "Florida": {
      //  games: [
      //    { date: 'Sep 3, 2022', utah_score: 26, opponent_points: 29 }
      //    ...
      //  ]
      // }
      dates.forEach( (date, index) => {
        let key = opponents[index].textContent.replace( /([([)0-9^\s])/g, '' ).toLowerCase().trim();
        team.games.push({
            opponent: key,
            date: date.textContent,
            utah_score: utah_score[index].textContent !== '' ? Number(utah_score[index].textContent) : 0,
            opponent_points: opponent_points[index].textContent !== '' ? Number(opponent_points[index].textContent) : 0
          }
        );
      } );

      // Finally return the data!
      return team;
    }) );

    // END BUILDING THE DATA PER PAGE

    // Convert data to JSON, and write the file!
    // NOTE: NEEDED TO CHANGE FILE TYPE TO .JS TO BE ABLE TO USE IT LOCALLY FOR CHARTS
    // I COULD SPIN UP AN EXPRESS SERVER, AND SERVE THAT JSON FILE ON AN API ENDPOINT OR JUST MAKE ENDPOINTS TO RETURN THIS DATA

    scheduleResults[2021] = previousYearStatistics['2021'];
    scheduleResults[2022] = currentYearStatistics['2022'];

    let data = JSON.stringify( scheduleResults, null, 2 );

    console.log( data );

    writeFile('db.js', `const dbData = ${data}`, 'utf8');

    await browser.close();
  } )
  .catch( (err) => console.log(err) );