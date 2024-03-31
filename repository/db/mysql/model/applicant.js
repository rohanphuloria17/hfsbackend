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
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        phone: {
          type: DataTypes.NUMBER,
          allowNull: false,
          unique: true,
        },
        project_details: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        skills: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        total_work_experience: {
          type: DataTypes.NUMBER,
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
