import redis from "../lib/redis.js";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../models/products.mod.js";

export const listAll = async (req, res) => {
  await redis.connect();
  const cacheKey = "all_products";

  // Check Redis cache first
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return res.status(200).json(JSON.parse(cachedData));
  }

  // If not in cache, fetch from database
  const allProducts = await getAllProducts();

  // Store the result in Redis cache
  await redis.set(cacheKey, JSON.stringify(allProducts), 'EX', 500); // Cache for 5 minutes

  res.status(200).json(allProducts);
}

export const getOne = async (req, res) => {
  const id = req.params.id;
  const product = await getProductById(id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
}

export const saveProduct = async (req, res) => {
  const { brand_name, description, quantity } = req.body;
  const newProduct = await createProduct([brand_name, description, quantity]);

  res.status(201).json(newProduct);
}

export const updateOne = async (req, res) => {
  const id = req.params.id;
  const { name, price } = req.body;
  const updatedProduct = await updateProduct(id, name, price);

  if (updatedProduct) {
    res.status(200).json(updatedProduct);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
}

export const deleteOne = async (req, res) => {
  const id = req.params.id;
  const deletedProduct = await deleteProduct(id);

  if (deletedProduct) {
    res.status(200).json(deletedProduct);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
}