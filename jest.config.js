const config = {
  verbose: true,
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: ["expect-puppeteer"]
};

module.exports = config;