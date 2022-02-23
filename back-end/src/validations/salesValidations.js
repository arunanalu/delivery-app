const Joi = require('@hapi/joi');
const { invalidEntry } = require('../utils/dictionaries/messagesDefault');
const { badRequest } = require('../utils/dictionaries/statusCode');
const { errorConstructor } = require('../utils/functions');

const incomingSaleSchema = Joi.object({
  userId: Joi.number().integer().required(),
  sellerId: Joi.number().integer().required(),
  totalPrice: Joi.number().required(),
  deliveryAddress: Joi.string().max(100).required(),
  deliveryNumber: Joi.number().max(50).required(),
});

const arrayProductsSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().required(),
});

const incomingSaleValidation = (incomingSale) => {
  const { error } = incomingSaleSchema.validate({ ...incomingSale });
  if (error) throw errorConstructor(badRequest, error.message);
};

const arrayProductsValidation = (arrayProducts) => {
  arrayProducts.forEach((element) => {
    const { error } = arrayProductsSchema.validate({ ...element });
    if (error) throw errorConstructor(badRequest, error.message);
  });
};

const registerSaleValidation = (incomingSale, arrayProducts) => {
  if (!incomingSale || !arrayProducts) {
    throw errorConstructor(badRequest, invalidEntry);
  }
  incomingSaleValidation(incomingSale);
  arrayProductsValidation(arrayProducts);
};

module.exports = { registerSaleValidation };