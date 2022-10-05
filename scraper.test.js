require('expect-puppeteer');

describe( 'Google', () => {
  beforeAll( async () => {
    await page.goto('https://www.sports-reference.com/cfb/schools/utah/2022-schedule.html', { waitUntil: 'domcontentloaded' });
  } );

  it( 'should open a new page, and match title.', async () => {
    const title = await page.title();
    expect(title).toMatch("2022 Utah Utes Schedule and Results | College Football at Sports-Reference.com");
  } );
} );