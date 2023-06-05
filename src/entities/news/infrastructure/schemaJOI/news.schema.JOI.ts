import Joi from "joi";

export const saveNewsSchema = Joi.object({
  news: {
    title: Joi.string().required(),
    description: Joi.string().required(),
    url: Joi.string().required(),
    urlToImage: Joi.string().required(),
    isSaved: Joi.boolean().required(),
  },
});
