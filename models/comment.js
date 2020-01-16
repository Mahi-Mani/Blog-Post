// Export borewell model
module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comments: {
            type: DataTypes.STRING
        }
    });

    return Comment;
}