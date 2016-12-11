import models from '../model/index'

export default class {
	static getAllChangemakers() {
		return models.changemaker.findAll();
	}

	static getFeaturedChangemakers() {
		return models.changemaker.findAll(
			{
				include: [
					{model: models.user, as:'user'},
					{model : models.content, as: 'mission'}
				], raw: true
			}
		).then(changemakers =>{  // view model creation
			let changemakerViewModels = []
			changemakers.forEach(changemaker => {
				let changemakerViewModel = {name: '', avatarUrl: '', mission: '', id: 0};
				changemakerViewModel.id = changemaker.id;
				changemakerViewModel.name = changemaker['user.firstName'] + ' ' +changemaker['user.lastName'];
				changemakerViewModel.avatarUrl = changemaker['user.avatarUrl'];
				changemakerViewModel.mission = changemaker['mission.text'];
				changemakerViewModels.push(changemakerViewModel);
			});
			return changemakerViewModels;
		});
	}


}
