const express = require('express');
const router = express.Router();

const secret = require('../config/auth').secret;
const jwt = require('jsonwebtoken');


const util = require('util');
const fs = require('fs');
const path = require('path');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const verifyToken = require('./middleware/verification');

router
  .get('/', verifyToken, (req, res) => {

    jwt.verify(req.token, secret, (error, user) => {
      if (error) {
        return res.send('Authorization failed');

      } else {

        return res.render('personal', {user})
      }
    })
  })
  .post('/notes', async (req, res) => {

    try {
      const usersFileData = await readFileAsync(path.join(__dirname, '..', 'data', 'users.json'), 'utf-8');
      const dataParsed = JSON.parse(usersFileData);

      let [ user ] = dataParsed.users.filter(user => (user.id == req.body.id));

        user.notes.push({
          id: new Date().getTime(),
          text: req.body.notetext
        });

        try {
          await writeFileAsync(path.join(__dirname, '..', 'data', 'users.json'), JSON.stringify(dataParsed, null, 4), 'utf-8');
        } catch(err) {
          console.log('Impossible to write a file:', err);
        }

      } catch(err) {
        console.log('Failed to write a note ', err);
      }
      return res.redirect('/personal')

  });


module.exports = router;