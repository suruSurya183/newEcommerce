// ownerValidation.js
import Joi from 'joi';

// Validate the owner data
export function validateCreateOwner(ownerData) {
  const ownerSchema = Joi.object({
    ownerName: Joi.string().required(),
    contactNumber: Joi.number().required(),
    address: Joi.object({
      streetName: Joi.string().required(),
      landMark: Joi.string().required(),
      city: Joi.string().required(),
      pinCode: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
    }).required(),
    emailAddress: Joi.string().email().required(),
    password: Joi.string().required()
  });


  const { error } = ownerSchema.validate(ownerData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return {error};
}

// Validate the update data
export function validateUpdateOwner(updateData) {
  const ownerSchema = Joi.object({
  ownerName: Joi.string().optional(),
  contactNumber: Joi.number().optional(),
  address: Joi.object({
    streetName: Joi.string().optional(),
    landMark: Joi.string().optional(),
    city: Joi.string().optional(),
    pinCode: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
  }).optional(),
  emailAddress: Joi.string().email().optional(),
  password: Joi.string().optional()
  });
  
  const { error } = ownerSchema.validate(updateData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return {error};
}