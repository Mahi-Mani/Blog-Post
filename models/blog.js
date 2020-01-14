// Export borewell model
module.exports = function(sequelize, DataTypes) {
    var Blog = sequelize.define("Blog", {

        blogTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [300, 500]
            }
        }
    });

    Blog.associate = function(models) {

        Blog.belongsTo(models.User, {
            through: {
                model: models.Comment
            }
        })
        
    }

    return Blog;
}