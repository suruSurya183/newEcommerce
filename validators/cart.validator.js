import Joi from "joi";

// Validate the cart data
export function validateCreateCart(cartData) {
  const cartSchema = Joi.object({
    items: Joi.array().items(Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().integer().min(0).default(0).required()
    })).required(),
    userId: Joi.string().required()
  });

  const { error } = cartSchema.validate(cartData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}

// Validate the update data
export function validateUpdateCart(updateData) {
  const cartSchema = Joi.object({
    items: Joi.array().items(Joi.object({
      productId: Joi.string().optional(),
      quantity: Joi.number().integer().min(0).default(0).optional()
    })).optional()
  });

  const { error } = cartSchema.validate(updateData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}


