import Order from "../models/OrderModel";
import config from "../config";

export const retrieveClient = (req, res, next) => {
  res.send(config.paypalId);
};
