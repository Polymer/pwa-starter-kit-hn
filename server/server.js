/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
const prpl = require('prpl-server');
const request = require('request');
const express = require('express');
const rendertron = require('rendertron-middleware');

const app = express();

app.use(rendertron.makeMiddleware({
  proxyUrl: 'https://render-tron.appspot.com/render',
  injectShadyDom: true,
}));

app.get('/api/*', (req, res, next) => {
  const url = `http://node-hnapi.herokuapp.com/${req.url.substring(5)}`;
  req.pipe(request(url)).pipe(res);
});

app.get('/*', prpl.makeHandler('./build', require('./build/polymer.json')));

app.listen(process.env.PORT || 8080);
