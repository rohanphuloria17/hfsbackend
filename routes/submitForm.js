const { submitForm } = require("../controller/index");
const {
  joiSchemas: { submitForm: submitFormValidation },
  handleError,
  handleResponse,
} = require("../middlewares");

module.exports = (router) => {
  router.post(
    "/internal/submitForm",
    submitFormValidation,
    submitForm,
    handleResponse,
    handleError
  );
};
