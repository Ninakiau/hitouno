import "dotenv/config"
import app from "./app"
import { sequelize } from "./config/sequelize"

const PORT = process.env.PORT || 3000;


const main = async () => {
    try {
      // await sequelize.sync({ force: true });
      await sequelize.sync();
      console.log("Connection has been established successfully.");
      app.listen(PORT, () => {
        console.log("Server is running on http://localhost:3000/");
      });
    } catch (error) {
      console.log(error);
    }
  };

main();