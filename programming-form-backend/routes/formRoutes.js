const router = require('express').Router();
const { submitForm, getForms } = require('../controllers/formController');

router.post('/submit', submitForm);
router.get('/getforms', getForms);

module.exports = router;