const Joi = require('joi');


const postBook = Joi.object({
    body: Joi.object({
        name: Joi.string().min(3).max(100).required().label('name'),
    }).required(),
});

const getBook = Joi.object({
    params: Joi.object({
        id: Joi.number().integer().positive().required().label('id'),
    }).required(),
});

module.exports = {
    postBook,
    getBook,
};
