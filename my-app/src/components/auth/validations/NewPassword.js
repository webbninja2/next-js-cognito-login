import * as yup from "yup";

export const NewPasswordFormValidation = yup.object().shape({
  newPassword: yup
    .string()
    .label("New Password")
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    ),
  confirmNewPassword: yup
    .string()
    .label("Confirm Password")
    .required()
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});
