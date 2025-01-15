import { Sequelize } from "sequelize-typescript";
import { CatModel } from "../schema/cat.model";
import { UserModel } from "../schema/user.model";



export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  models: [UserModel, CatModel], 
  logging: true, // disable logging
});

// sequelize.sync({ force: true }).then(() => {
//   console.log("Database & tables created!");
// });

