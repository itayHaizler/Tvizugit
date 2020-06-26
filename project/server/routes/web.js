const express = require('express');

const router = express.router();
const homeController = require('../controllers/home');
const uploadController = require('../controllers/upload');

const routes = app => {
  router.get('/', homeController.getHome);

  router.post('/upload', uploadController.uploadFile);

  return app.use('/', router);
};

module.exports = routes;