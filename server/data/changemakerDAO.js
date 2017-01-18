import models, { sequelize } from '../model';
import { extractProps } from '../utils/modelUtils';
import _ from 'lodash';

const CHANGEMAKER_LIMIT_LANDING_PAGE = 5;

function toUserModel(user = {}) {
	return Object.assign(user, {
		name: `${user.firstName} ${user.lastName}`
	});
}

function prepareDTO(rawCm) {
	return Object.assign({}, rawCm, {
		user: toUserModel(extractProps(rawCm, 'user')),
		mission: extractProps(rawCm, 'mission')
	});
}

/**
* data access for changemakers
* queries related content of the user and flattens it into the result object
*/
export default class {

	static getAll() {
		return models.changemaker.findAll();
	}

	static getChangemakerById(id) {
		if ('number' !== typeof id) {
			throw new Error('changemaker id must be a number');
		}
		return models.changemaker.find({
			where: { id: id },
			include: [
				{model: models.user, as:'user'},
				{model: models.content, as: 'mission'},
				{model: models.statusUpdate, as: 'statusUpdates', include: [
					{model: models.content, as: 'content'}
				]}
			],
			order: [
				[{model: models.statusUpdate, as: 'statusUpdates'}, 'createdAt', 'DESC']
			]
		});
	}

	static getFeatured() {

	 	return models.changemaker.findAll({
			include: [
				{model: models.user, as: 'user'},
				{model: models.content, as: 'mission'},
				{model: models.statusUpdate, as: 'statusUpdates', attributes: []}
			],
			attributes: {
				include: [
					[ sequelize.fn('MAX', sequelize.col('statusUpdates.createdAt')), 'lastStatusUpdate' ]
				]
			},
			group: [
				['id'],
				[{model: models.user, as: 'user'}, 'id'],
				[{model: models.content, as: 'mission'}, 'id']
			],
			order: [
				[ sequelize.fn('MAX', sequelize.fn('COALESCE', sequelize.col('statusUpdates.createdAt'), '-infinity')), 'DESC' ]
			],
			raw: true
		}).then(cms => {
			return _.take(cms, CHANGEMAKER_LIMIT_LANDING_PAGE).map(prepareDTO);
		});
	}

	static createChangemaker(data) {
		// TODO use current user
		data.fkUserId = 1;
		return models.changemaker.create(
			data,
			{
				include: [ models.changemaker.mission ]
			}
		).then( changemaker => {
			return changemaker.id;
		});
	}
}
