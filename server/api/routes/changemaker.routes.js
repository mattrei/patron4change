import express from 'express';
import controller from './controller';

// changemaker specific stuff

function toResult(cm) {
	let clone = Object.assign({}, cm);
	delete clone.user.pwhash;
	delete clone.user.isBlocked;
	delete clone.isApproved;
	delete clone.fkUserId;
	delete clone.fkContentId;
	return clone;
}

export default (changemakerService) => {

	const router = express.Router();

	router.get('/', (req,res) => {
		changemakerService.getAllChangemakers().then(users => {
			res.send(users);
		});
	});

	router.get('/featured', controller(() => {
		return changemakerService.getFeaturedChangemakers().then(cms => cms.map(toResult));
	}));

	router.get('/:id', controller(({ id }) => {
		let nId = parseInt(id);
		if (isNaN(nId)) {
			return { status: 400, message: 'id needs to be a number' };
		}
		return changemakerService.getChangemakerById(nId).then(toResult);
	}));

	router.get('/:id/updates', (req, res) => {
		changemakerService.getUpdatesByUserId(req.params.id).then(updates => {
			res.send(updates);
		});
	})

	router.get('/:username', (req,res) => {
		res.send({});
	});

	return router;
}
