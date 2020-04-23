// Export Blog model
module.exports = function(sequelize, DataTypes) {
    var Blog = sequelize.define("Blog", {

        blogTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 500]
            }
        },

        blogText: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 500]
            }
        }
    });

    Blog.associate = function(models) {
        models.Blog.hasMany(models.Comment, { onDelete: 'cascade', hooks: true });
    };

    Blog.associate = function(models) {
        models.Blog.belongsTo(models.User, {
            onDelete: "CASCADE"
        });
    }

    return Blog;
}