module.exports = (sequelize, DataTypes) => {

	const User = sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		firstName: {
			type: DataTypes.STRING
		},
		lastName: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING(254)
		},
		isEmailConfirmed: {
			type: DataTypes.BOOLEAN
		},
		isAnonymous: {
			type: DataTypes.BOOLEAN
		},
		isBlocked: {
			type: DataTypes.BOOLEAN
		},
		pwhash: {
			type: DataTypes.STRING(60)
		},
		avatarUrl: {
			type: DataTypes.STRING
		},
		birthay:{
			type: DataTypes.DATE
		},
		nationality:{
			type: DataTypes.STRING(150)
		},
		countryOfResidence:{
			type: DataTypes.STRING(250)
		}
	}, {
		classMethods: {
			associate: function(models){
				User.hasMany(models.backing, {as: 'backings'});
			}
		},
		freezeTableName: false // Model tableName will be the same as the model name
	});

	return User;
}
