const { Router } = require("express");

const { HttpCode } = require("../utlis/constants");

const route = new Router();

const saldoRouter = (app, saldoService) => {
  app.use("/saldos", route);

  route.get("/", async (req, res, next) => {
    try {
      const { limit, date } = req.query;
      const user_id = req.headers["user_id"];
      const saldos = await saldoService.findAll({ limit, date, user_id });

      return res.status(HttpCode.OK).json(saldos);
    } catch (err) {
      console.log(`Can't get saldos. Error: ${err}`);
      next(err);
    }
  });

  route.get("/:saldoId", async (req, res, next) => {
    try {
      const { saldoId } = req.params;
      const user_id = req.headers["user_id"];
      const saldos = await saldoService.findOne({ user_id, saldoId });

      return res.status(HttpCode.OK).json(saldos);
    } catch (err) {
      console.log(`Can't get saldo. Error: ${err}`);
      next(err);
    }
  });

  route.post("/", async (req, res, next) => {
    try {
      const { value } = req.body;
      const user_id = req.headers["user_id"];
      const newSaldo = await saldoService.create({ value, user_id });

      return res.status(HttpCode.CREATED).json(newSaldo);
    } catch (err) {
      console.log(`Can't post saldos. Error: ${err}`);
      next(err);
    }
  });
  route.put("/:saldoId", async (req, res, next) => {
    try {
      const { saldoId } = req.params;
      const { value } = req.body;
      const user_id = req.headers["user_id"];
      const updatedSaldo = await saldoService.update({ value, saldoId, user_id });

      return res.status(HttpCode.OK).json(updatedSaldo);
    } catch (err) {
      console.log(`Can't update saldo. Error: ${err}`);
      next(err);
    }
  });

  route.delete("/:saldoId", async (req, res, next) => {
    try {
      const { saldoId } = req.params;
      const user_id = req.headers["user_id"];
      const deletedSaldo = await saldoService.delete({ saldoId, user_id });

      return res.status(HttpCode.OK).json(deletedSaldo);
    } catch (err) {
      console.log(`Can't delete saldo. Error: ${err}`);
      next(err);
    }
  });
};

module.exports = saldoRouter;
