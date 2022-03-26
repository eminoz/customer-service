const express = require("express")
const expressApp = require("./express-app")
const databaseConnection = require("./database/connection")
const { PORT } = require('./config/index');

const StartServer = async () => {
  const app = express()

  await databaseConnection()

  await expressApp(app)

  app.listen(PORT, () => { console.log(`lintening to port ${PORT}`) })
    .on("error", (err) => {
      console.log(err); process.exit();
    })
}
StartServer()