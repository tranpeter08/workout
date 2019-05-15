const express = require('express');
const config = require('../config');
const request = require('request');

const router = express.Router();

let links;
const RECIPES_ROOT_URL = 'https://api.edamam.com/search';
const app_id = config.EDAMAM_RECIPES_ID;
const app_key = config.EDAMAM_RECIPES_KEY;

router.get('/', (req, res, next) => {
  const {q, from, to} = req.query;

  const searchQ = {
    q,
    app_id,
    app_key,
    from,
    to
  };

  const options = {
    json: true,
    qs: searchQ
  };

  request.get(
    RECIPES_ROOT_URL,
    options,
    (err, resp, body) => {

      if (err) {
        console.log('EDAMAM ERROR \n', err);
        return res.status(500).send({message: 'Internal Server Error'});
      };

      if (resp.statusCode !== 200) {
        return next(resp);
      };

      const {more, hits} = body;
      return res.status(resp.statusCode).json({more, hits});

    }
  )

})

module.exports = { router };