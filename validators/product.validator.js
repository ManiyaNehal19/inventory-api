const { z } = require("zod");

const idField = z.string().min(1, "id is required");
const nameField = z.string().min(1, "name is required").max(100);
const quantityField = z.number().int().nonnegative("quantity cannot be negative");
const priceField = z.number().positive("price must be greater than 0");
const tagsField = z.array(z.string()).optional();
const mainCategoryField = z.string().min(1, "main_category is required");

const createProductSchema = z.object({
  id: idField,
  name: nameField,
  quantity: quantityField,
  price: priceField,
  tags: tagsField,
  main_category: mainCategoryField,
});

const updateProductSchema = z.object({
  id: idField,
  name: nameField.optional(),
  quantity: quantityField.optional(),
  price: priceField.optional(),
  tags: tagsField,
  main_category: mainCategoryField.optional(),
});

const productIdSchema = z.object({
  id: idField,
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  productIdSchema,
};