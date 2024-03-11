import Joi from "joi";

// Validate the order data
export function validateCreateOrder(orderData) {
  const orderSchema = Joi.object({
    userId: Joi.string().required(),
    items: Joi.array().items(Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().min(0).default(0).required()
    })).required(),
    totalPrice: Joi.number().required(),
    shippingAddress: Joi.string().max(150).required(),
    billingAddress: Joi.string().max(200).required(),
    discount: Joi.number().min(0),
    deliveryFee: Joi.number().min(0),
    tax: Joi.number().min(0)
  });

  const { error } = orderSchema.validate(orderData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}

// Validate the update data
export function validateUpdateOrder(updateData) {
  const orderSchema = Joi.object({
    items: Joi.array().items(Joi.object({
      productId: Joi.string().optional(),
      quantity: Joi.number().min(0).default(0).optional()
    })).optional(),
    totalPrice: Joi.number().optional(),
    shippingAddress: Joi.string().max(150).optional(),
    billingAddress: Joi.string().max(200).optional(),
    discount: Joi.number().min(0).optional(),
    deliveryFee: Joi.number().min(0).optional(),
    tax: Joi.number().min(0).optional()
  });

  const { error } = orderSchema.validate(updateData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}


