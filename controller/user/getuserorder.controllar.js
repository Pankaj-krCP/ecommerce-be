const asyncHandler = require("express-async-handler");
const Order = require("../../models/orderModel");
const validateMongoDbId = require("../../utils/validateMongodbId");

const getOrderByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userorders = await Order.find({ orderBy: id })
      .populate("orderItems.product")
      .populate("orderBy")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = getOrderByUserId;
