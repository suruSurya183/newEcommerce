import Joi from "joi";

// Validate the product data
export function validateCreateProduct(productData) {
  const productSchema = Joi.object({
    categoryId: Joi.string().trim().required(),
    itemName: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    price: Joi.number(),
    quantityInStock: Joi.number()
  });

  const { error } = productSchema.validate(productData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}

// Validate the update data
export function validateUpdateProduct(updateData) {
  const productSchema = Joi.object({
    categoryId: Joi.string().trim().optional(),
    itemName: Joi.string().trim().optional(),
    description: Joi.string().trim().optional(),
    price: Joi.number().optional(),
    quantityInStock: Joi.number().optional()
  });

  const { error } = productSchema.validate(updateData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}


