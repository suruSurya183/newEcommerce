import Joi from "joi";

// Validate the refund data
export function validateCreateRefund(refundData) {
  const refundSchema = Joi.object({
    orderId: Joi.string().required(),
    userId: Joi.string().required(),
    refundedAmount: Joi.number().required(),
    refundReason: Joi.string().required()
  });

  const { error } = refundSchema.validate(refundData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}

// Validate the update data
export function validateUpdateRefund(updateData) {
  const refundSchema = Joi.object({
    orderId: Joi.string().optional(),
    userId: Joi.string().optional(),
    refundedAmount: Joi.number().optional(),
    refundReason: Joi.string().optional(),
    refundStatus: Joi.string().optional()
  });

  const { error } = refundSchema.validate(updateData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}


