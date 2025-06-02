const ListingServerSchema = require('../Validations/listingSchemaValidation');
const ExpressErr = require('../errors/expressErr');

module.exports.validateSchema = (req, res, next) => {
  let {error} = ListingServerSchema.validate(req.body);
  if(error) {
    return next(new ExpressErr(400, error.details[0].message, req.originalUrl));
  } 
  next();
}