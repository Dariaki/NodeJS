const express = require('express');
const router = express.Router();
const store = require('store');

const util = require('util');
const fs = require('fs');
const path = require('path');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


router
  .delete('/', async (req, res) => {

    store.remove('token');

      const usersFileData = await readFileAsync(path.join(__dirname, '..', 'data', 'users.json'), 'utf-8');
      const dataParsed = JSON.parse(usersFileData);

      let [ user ] = dataParsed.users.filter(user => (user.id == req.body.id));

      if(user) {
        let index = dataParsed.users.indexOf(user.id);
        dataParsed.users.splice(index, 1);
        await writeFileAsync(path.join(__dirname, '..', 'data', 'users.json'), JSON.stringify(dataParsed, null, 4), 'utf-8');
        console.log('user was successfully deleted')
      }

      return res.redirect("/registration");
  });

module.exports = router;