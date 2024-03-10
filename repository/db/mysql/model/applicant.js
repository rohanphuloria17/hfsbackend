const { Model, DataTypes } = require("sequelize");
const {
  createConnection: { get },
} = require("../connection/index");

class applicant extends Model {}

module.exports = {
  initialise: async () => {
    const connection = await get();
    applicant.init(
      {
        id: {
          type: DataTypes.BIGINT(20),
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize: connection,
        tableName: "applicant",
        underscored: true,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  },
  get: () => applicant,
};
