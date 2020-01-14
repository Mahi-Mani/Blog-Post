// Export borewell model
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {

        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 10]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 10]
            }
        },
        hasBlog: DataTypes.BOOLEAN
    });

    User.associate = function (models) {

        User.belongsToMany(models.Blog, {
            through: {
                model: models.Comment
            }
        });
    }

    return User;
}