const router = require('express').Router();
const { submitForm, getForms, cacheMiddleware } = require('../controllers/formController');

router.post('/submit', submitForm);
router.get('/getforms',cacheMiddleware, getForms);

module.exports = router;