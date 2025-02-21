import "dotenv/config"
import {httpServer} from "./app"
import { sequelize } from "./config/sequelize"

const PORT = process.env.PORT || 3000;


const main = async () => {
    try {
      // await sequelize.sync({ force: true });
      await sequelize.sync();
      console.log("Connection has been established successfully.");
      httpServer.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
    } catch (error) {
      console.log(error);
    }
  };

main();