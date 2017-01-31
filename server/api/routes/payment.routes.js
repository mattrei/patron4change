import express from 'express';

export default (paymentSvcs) => {

  const router = express.Router();

  router.post('/mango/register', (req, res) => {
		paymentSvcs.mango.registerUser(req.body).then((accountId) => {
			res.send(accountId)
		}).catch(() => {
			res.status(400).send('general operation error');
		})
	});

  router.post('/mango/pay', (req, res) => {
  	paymentSvcs.mango.oneTimeSupport(req.body).then((url) => {
  		res.send(url)
		}).catch(() => {
  		res.status(400).send('general operation error');
		})
	});

	router.post('/mango/preregisterCard', (req, res) => {
		paymentSvcs.mango.prepareToReadCardDetails(req.body).then((preRegistrationData) => {
			res.send(preRegistrationData)
		}).catch(() => {
			res.status(400).send('general operation error')
		})
	});

	router.post('/mango/registerCard', (req, res) => {
		paymentSvcs.mango.registerCreditCardForRecurringPayment(req.body)
			.then((cardRegistrationId) => {
				res.send(cardRegistrationId);
			}).catch(() => {
				res.status(400).send('general operation error')
			})
	});

	router.get('/mango/recurring', controller((paymentData) => {
		return paymentSvcs.mango.createRecurringPayment(paymentData);
	}));

  return router;
}
