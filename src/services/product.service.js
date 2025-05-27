const ProductDao = require("../daos/product.dao");

const getAllProducts = async (user) => {
  const result = await ProductDao.getAllProducts();
  return result;
};

const getProductById = async (reqId, user) => {
  const result = await ProductDao.getProductById(reqId);
  return result;
};

const createProduct = async (reqBody, user) => {
  const productData = {
    ...reqBody,
    userId: user._id,
    isDeleted: false,
    createdBy: user._id,
    updatedBy: user._id,
  };
  const result = await ProductDao.createProduct(productData);
  return result;
};

const updateProduct = async (id, payload, user) => {
  const updates = {
    ...payload,
    updatedBy: user._id,
  };
  return await ProductDao.updateProduct(id, updates);
};

const softDeleteProduct = async (id, user) => {
  const updates = {
    isDeleted: true,
    updatedBy: user._id,
  };
  return await ProductDao.deleteProduct(id, updates);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  softDeleteProduct,
};
