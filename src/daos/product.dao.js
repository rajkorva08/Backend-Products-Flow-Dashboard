const db = require("../models/index");
const Product = db.Product;

const getAllProducts = async () => {
  const result = await Product.findAll({
    order: [["updatedAt", "DESC"]],
  });
  return result;
};

const getProductById = async (reqId) => {
  const result = await Product.findByPk(reqId);
  return result;
};

const createProduct = async (reqBody) => {
  const existing = await Product.scope(null).findOne({
    where: {
      productname: reqBody.productname,
      isDeleted: true,
    },
  });

  if (existing) {
    const updated = await existing.update({
      ...reqBody,
      isDeleted: false,
      updatedAt: new Date(),
    });

    return updated;
  }

  const result = await Product.create(reqBody);
  return result;
};

const updateProduct = async (id, updates) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error("Product not found");

  const result = await product.update(updates);
  return result;
};

const deleteProduct = async (id, updates) => {
  const product = await Product.scope(null).findByPk(id);
  if (!product) {
    throw new Error("Product not found");
  }

  if (product.isDeleted) {
    throw new Error("Product already deleted");
  }

  const result = await product.update({ ...updates, updatedAt: new Date() });
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
