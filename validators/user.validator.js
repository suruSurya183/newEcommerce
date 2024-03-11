// userValidation.js
import Joi from 'joi';

// Validate the user data
export function validateCreateUser(userData) {
  const userSchema = Joi.object({
  userName: Joi.string().required(),
  type: Joi.string().valid('Super-Admin', 'Admin', 'Vendor', 'Customer', 'Staff').default('Customer'),
  contactNumber: Joi.number().required(),
  location: Joi.string().required(),
  emailAddress: Joi.string().email().required(),
  password: Joi.string().required()
  });


  const { error } = userSchema.validate(userData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return {error};
}

// Validate the update data
export function validateUpdateUser(updateData) {
  const userSchema = Joi.object({
    userName: Joi.string().optional(),
  type: Joi.string().valid('Super-Admin', 'Admin', 'Vendor', 'Customer', 'Staff').default('Customer'),
  contactNumber: Joi.number().optional(),
  location: Joi.string().optional(),
  emailAddress: Joi.string().email().optional(),
  password: Joi.string().optional()
  });
  
  const { error } = userSchema.validate(updateData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return {error};
}

// Validate the update data for AdminModel
// export function validateUpdateUserRequest(sendRequest) {
//   const adminSchema = Joi.object({
//     type: Joi.string(),
//     walletAmount: Joi.number()
//   });
  
//   const { error } = adminSchema.validate(sendRequest);
//   if (error) {
//     const errorMessage = error.details.map((detail) => detail.message).join(", ");
//     throw new Error(errorMessage);
//   }
//   return { error };
// }
