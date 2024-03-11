import Joi from "joi";

// Validate the feedback data
export function validateCreateFeedback(feedbackData) {
  const feedbackSchema = Joi.object({
    userName: Joi.string().max(200).required(),
    emailAddress: Joi.string().email().max(100).required(),
    comment: Joi.string().required()
  });

  const { error } = feedbackSchema.validate(feedbackData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}

// Validate the update data
export function validateUpdateFeedback(updateData) {
  const feedbackSchema = Joi.object({
    userName: Joi.string().max(200).optional(),
    emailAddress: Joi.string().email().max(100).optional(),
    comment: Joi.string().optional()
  });

  const { error } = feedbackSchema.validate(updateData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}


