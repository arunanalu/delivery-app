const Joi = require('@hapi/joi');
const { invalidEntry } = require('../utils/dictionaries/messagesDefault');
const { badRequest } = require('../utils/dictionaries/statusCode');
const { errorConstructor } = require('../utils/functions');

const incomingSaleSchema = Joi.object({
  userId: Joi.required(),
  sellerId: Joi.required(),
  totalPrice: Joi.string().required(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.string().required(),
});

const arrayProductsSchema = Joi.object({
  productId: Joi.required(),
  quantity: Joi.required(),
});

const updateSaleSchema = Joi.object({
  id: Joi.string().required(),
  status: Joi.string().required(),
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

const updateSaleValidation = (id, status) => {
  const { error } = updateSaleSchema.validate({ id, status });
  if (error) throw errorConstructor(badRequest, error.message);
};

const getSalesByUserIdValdiation = (id) => {
  if (!id) throw errorConstructor(badRequest, invalidEntry);
};

module.exports = { registerSaleValidation, updateSaleValidation, getSalesByUserIdValdiation };