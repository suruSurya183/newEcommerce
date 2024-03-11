import Joi from 'joi';

// Validate payment data
export function validatePaymentData(paymentData) {
    const paymentSchema = Joi.object({
      orderid: Joi.string().required(), // Assuming orderid is a string and required
      amount: Joi.number().required(),
      paymentStatus: Joi.string().valid('Pending', 'Completed', 'Failed').default('Pending'),
      paymentMethod: Joi.string().valid('CreditCard', 'DebitCard', 'NetBanking', 'UPI').required(),
    });
  
    const { error, value } = paymentSchema.validate(paymentData);
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(", ");
      throw new Error(errorMessage);
    }
    return value;
  }


  // Validate updated payment data
export function validateUpdatedPaymentData(updatedPaymentData) {
    const paymentSchema = Joi.object({
        orderid: Joi.string(), // Assuming orderid is a string
        amount: Joi.number(),
        paymentStatus: Joi.string().valid('Pending', 'Completed', 'Failed'),
        paymentMethod: Joi.string().valid('CreditCard', 'DebitCard', 'NetBanking', 'UPI')
    });

    const { error, value } = paymentSchema.validate(updatedPaymentData);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(", ");
        throw new Error(errorMessage);
    }
    return value;
}