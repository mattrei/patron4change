module.exports = (sequelize, DataTypes) => {

	const Backing = sequelize.define('backing', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		amount: {
			type: DataTypes.INTEGER
		},
	}, {
		classMethods:{
			associate: function(models){
				Backing.belongsTo(models.user, {foreignKey: 'fk_sender_id', as: 'user'});
				Backing.belongsTo(models.changemaker, {foreignKey: 'fk_recipient_id', as: 'changemaker'});
				Backing.hasMany(models.payment, {as: 'payments'})
			}
		},

		freezeTableName: false // Model tableName will be the same as the model name
	});

	return Backing;
}
