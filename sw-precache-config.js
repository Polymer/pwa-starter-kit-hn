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
      urlPattern: new RegExp('/api/'),
      handler: 'networkFirst'
    }
  ]
};
