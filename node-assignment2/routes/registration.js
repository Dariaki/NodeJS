const express = require('express');
const router = express.Router();
const users = require('../data/users.json');

const util = require('util');
const fs = require('fs');
const path = require('path');

const bcrypt = require('bcrypt');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

router
  .get('/', (req, res) => {
    return res.render('registration');
  })

  .post('/', async (req, res) => {

    try {
      const usersFileData = await readFileAsync(path.join(__dirname, '..', 'data', 'users.json'), 'utf-8');
      const dataParsed = JSON.parse(usersFileData);

      const hasedPassword = await bcrypt.hash(req.body.password, 10);

      dataParsed.users.push({
        id: new Date().getTime(),
        name: req.body.name,
        email: req.body.email,
        password: hasedPassword,
        notes: []
      });

      try {
        await writeFileAsync(path.join(__dirname, '..', 'data', 'users.json'), JSON.stringify(dataParsed, null, 4), 'utf-8');
      } catch(err) {
        console.log('Impossible to write a file:', err);
      }

      return res.redirect('/login')
    } catch {
      return res.redirect('/registration')
    }


  });



module.exports = router;