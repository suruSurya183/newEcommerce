import Joi from "joi";

// Validation the Shipping data
export function ValidateShipping(shippingData) {
    const shippingSchema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        estimatedDeliveryTime: Joi.number().required()
    });
    const { error } = shippingSchema.validate(shippingData);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(", ");
        throw new Error(errorMessage);
  }
  return {error};
}


// Validate the update Shipping data
export function ValidateUpdateShipping(shippingId) {
    const shippingSchema = Joi.object({
        name: Joi.string(),
        description: Joi.string(), // Make description optional
        estimatedDeliveryTime: Joi.number().required()
    });
    const { error } = shippingSchema.validate(shippingId);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(", ");
        throw new Error(errorMessage);
    }
    return { error: null };
}
