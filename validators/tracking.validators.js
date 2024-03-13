import Joi from "joi";

// Validation the Tracking data
export function ValidateTracking(trackingData) {
    const trackingSchema = Joi.object({
        orderId: Joi.string().required(),
        location: Joi.string().required(),
        status: Joi.string(),
        estimatedDeliveryDate: Joi.date().required() // Changed to date validation for estimatedDeliveryDate
    });
    const { error } = trackingSchema.validate(trackingData);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(", ");
        throw new Error(errorMessage);
    }
    return { error: null };
}



// Validate the update Tracking data
export function ValidateUpdateTracking(trackingId) {
    const trackingSchema = Joi.object({
        orderId: Joi.string().required(),
        status: Joi.string().required(),
        estimatedDeliveryDate: Joi.date().required() // Changed to date validation for estimatedDeliveryDate
    });
    const { error } = trackingSchema.validate(trackingId);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(", ");
        throw new Error(errorMessage);
    }
    return { error: null };
}
