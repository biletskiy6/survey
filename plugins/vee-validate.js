import { extend } from "vee-validate";
import { required, alpha, email } from "vee-validate/dist/rules";

extend("required", {
    ...required,
    message: "This field is required"
});

extend("email", {
    ...email,
    message: "Check the email"
});

extend("alpha", {
    ...alpha,
    message: "This field must only contain alphabetic characters"
});
