module.exports = {
  staticFileGlobs: [
    'manifest.json',
    'src/**/*',
  ],
  runtimeCaching: [
    {
      urlPattern: new RegExp('/@webcomponents/webcomponentsjs/'),
      handler: 'fastest'
    },
    {
      urlPattern: new RegExp('https://node-hnapi\.herokuapp\.com/'),
      handler: 'networkFirst'
    }
  ]
};
