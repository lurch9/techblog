const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();

const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers.js");

const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 8640000,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };
  
  app.use(session(sess));
  
  const hbs = exphbs.create({ helpers });
  
  app.engine("handlebars", hbs.engine);
  app.set("view engine", "handlebars");
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});