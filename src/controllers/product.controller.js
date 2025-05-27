const ProductService = require("../services/product.service");

exports.getAllProducts = async (req, res, next) => {
  try {
    // "superAdmin", "productManager", "orderManager", "endUser"
    const user = req.user;
    const result = await ProductService.getAllProducts(user);
    return res.status(200).json({ status: 200, result });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    // "superAdmin", "productManager", "orderManager", "endUser"
    const user = req.user;
    const result = await ProductService.getProductById(req.params.id, user);
    return res.status(200).json({ status: 200, result });
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    // "superAdmin", "productManager", "orderManager", "endUser"
    const user = req.user;
    const result = await ProductService.createProduct(req.body, user);
    return res.status(201).json({ status: 201, result });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await ProductService.updateProduct(
      req.params.id,
      req.body,
      user
    );
    return res.status(200).json({ status: 200, result });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await ProductService.softDeleteProduct(req.params.id, user);
    return res
      .status(200)
      .json({ status: 200, message: "Product delete successfully", result });
  } catch (err) {
    next(err);
  }
};
