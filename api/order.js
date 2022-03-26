const { OrderService } = require("../services");

module.exports = (app) => {
  const orderService = new OrderService()
  app.post("/order", async (req, res, next) => {
    const data = await orderService.CreateNewOrder(req)
    return res.json(data);
  });
  app.get("/getuserorders", async (req, res, next) => {
    const data = await orderService.GetUserOrders(req)
    return res.json(data)
  })
};
