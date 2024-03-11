import Joi from 'joi';

// Define Joi schema for card validation
export function validateCard(cardData) {
  const cardsSchema = Joi.object({
    company: Joi.string().max(100).required(),
    cardNumber: Joi.string().max(20).required(),
    cardOwnerName: Joi.string().max(255).required(),
    expireDate: Joi.date().required(),
    CVC: Joi.string().max(20).required(),
    userid: Joi.string().required() // Assuming userid is a string
  });
  const { error } = cardsSchema.validate(cardData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}


export function validateCardUpdate(card) {
    const cardSchema = Joi.object({
      company: Joi.string().max(100).optional(),
      cardNumber: Joi.string().max(20).optional(),
      cardOwnerName: Joi.string().max(255).optional(),
      expireDate: Joi.date().optional(),
      CVC: Joi.string().max(20).optional(),
      userid: Joi.string().optional() // Assuming userid is a string
    });
  
    const { error } = cardSchema.validate(card);
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(", ");
      throw new Error(errorMessage);
    }
    return { error };
  }