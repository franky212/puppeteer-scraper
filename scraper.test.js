const puppeteer = require('puppeteer');
require('expect-puppeteer');

describe( 'Utes Web Scraper', () => {

  describe( 'Utes 2022 Schedule', () => {
    it( 'should open the schedule page, and match title.', async () => {
      await page.goto('https://www.sports-reference.com/cfb/schools/utah/2022-schedule.html', { waitUntil: 'domcontentloaded' });
      expect(page.title()).resolves.toMatch("2022 Utah Utes Schedule and Results | College Football at Sports-Reference.com");
    } );

    it( 'should get the Utes opponents/games for 2022', async () => {
      let results = await page.evaluate( () => {
        let team = {
          opponents: [],
          dates: []
        };
        let opponents = document.querySelectorAll( '#schedule td[data-stat="opp_name"]' );
        let dates = document.querySelectorAll( '#schedule td[data-stat="date_game"]' );
        dates.forEach( (dates) => team.dates.push(dates.textContent) );
        opponents.forEach( opponent => team.opponents.push( opponent.textContent ) );
        return team;
      } );
      expect( results.dates[0] ).toBe( 'Sep 3, 2022' );
      expect( results.opponents[0] ).toBe( 'Florida' );
      expect( results.opponents.length ).toBe( 12 );
    } );
  } );

  describe( 'Utes 2021 Stats', () => {
    it( 'should open the stats page, and match title.', async () => {
      await page.goto('https://www.sports-reference.com/cfb/schools/utah/2021.html', { waitUntil: 'domcontentloaded' });
      expect(page.title()).resolves.toMatch("2021 Utah Utes Stats | College Football at Sports-Reference.com");
    } );
  } );

  describe( 'Utes 2022 Stats', () => {
    it( 'should open the stats page, and match title.', async () => {
      await page.goto('https://www.sports-reference.com/cfb/schools/utah/2022.html', { waitUntil: 'domcontentloaded' });
      expect(page.title()).resolves.toMatch("2022 Utah Utes Stats | College Football at Sports-Reference.com");
    } );
  } );

  // it ( 'should open')
} );