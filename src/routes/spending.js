const { Router } = require("express");

const { HttpCode } = require("../utlis/constants");

const route = new Router();

const spendingRouter = (app, spendingService) => {
  app.use("/spendings", route);

  route.get("/", async (req, res, next) => {
    try {
      const { limit, date } = req.query;
      const user_id = req.headers["user_id"];
      const spendings = await spendingService.findAll({ limit, date, user_id });

      return res.status(HttpCode.OK).json(spendings);
    } catch (err) {
      console.log(`Can't get spendings. Error: ${err}`);
      next(err);
    }
  });

  route.post("/", async (req, res, next) => {
    try {
      const { name, value } = req.body;
      const user_id = req.headers["user_id"];
      const newSpending = await spendingService.create({ name, value, user_id });

      return res.status(HttpCode.CREATED).json(newSpending);
    } catch (err) {
      console.log(`Can't post spendings. Error: ${err}`);
      next(err);
    }
  });
  route.put("/:spendingId", async (req, res, next) => {
    try {
      const { spendingId } = req.params;
      const { name, value } = req.body;
      const user_id = req.headers["user_id"];
      const updatedSpending = await spendingService.update({ name, value, spendingId, user_id });

      return res.status(HttpCode.OK).json(updatedSpending);
    } catch (err) {
      console.log(`Can't update spending. Error: ${err}`);
      next(err);
    }
  });
  route.delete("/:spendingId", async (req, res, next) => {
    try {
      const { spendingId } = req.params;
      const user_id = req.headers["user_id"];
      const deletedSpending = await spendingService.delete({ spendingId, user_id });

      return res.status(HttpCode.OK).json(deletedSpending);
    } catch (err) {
      console.log(`Can't delete spending. Error: ${err}`);
      next(err);
    }
  });
};

module.exports = spendingRouter;