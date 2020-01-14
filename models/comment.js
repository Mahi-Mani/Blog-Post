// Export borewell model
module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 10]
            }
        }
    });

    return Comment;
}