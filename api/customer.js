const { CustomerService } = require("../services");
const UserAuth = require("../middleware/is-auth");

module.exports = (app) => {
  const service = new CustomerService();
  app.post("/signup", async (req, res, next) => {
    try {
      const data = await service.SignUp(req);

      return res.json(data);
    } catch (error) {
      throw error;
    }
  });
  app.post("/login", async (req, res, next) => {
    try {
      const responseData = await service.SignIn(req);

      return res.json(responseData);
    } catch (error) {
      throw error;
    }
  });

  app.post("/address", UserAuth, async (req, res, next) => {
    try {
      const responseData = await service.AddNewAddress(req);
      return res.json(responseData);
    } catch (error) {
      throw error;
    }
  });
  app.get("/profile", UserAuth, async (req, res, next) => {
    try {
      const data = await service.GetProfile(req);
      return res.json(data);
    } catch (error) {
      throw error;
    }
  });
};

