// validationUtils.js

export const errorMessages = {
  required: (field) => `${field} is required`,
  invalidPhone: "Enter valid 11 digit phone number",
  invalidEmail: "Enter valid email",
  passwordMismatch: "Passwords do not match",
};

export const validateForm = (formData, rules) => {
  const errors = {};
  for (const field in rules) {
    const value = formData[field];
    const fieldRules = rules[field];

    if (fieldRules.required && (!value || !value.toString().trim())) {
      errors[field] = fieldRules.message || errorMessages.required(field);
      continue;
    }

    if (fieldRules.pattern && value) {
      const { value: patternValue, message } = fieldRules.pattern;
      if (!patternValue.test(value)) {
        errors[field] = message;
      }
    }

    if (fieldRules.custom && typeof fieldRules.custom === "function") {
      const customError = fieldRules.custom(value, formData);
      if (customError) errors[field] = customError;
    }
  }
  return errors;
};

export const initialCheckoutData = {
  fullName: "",
  region: "",
  phone: "",
  city: "",
  house: "",
  area: "",
  landmark: "",
  address: "",
};

export const checkoutRules = {
  fullName: { required: true, message: errorMessages.required("Full name") },
  region: { required: true, message: errorMessages.required("Region") },
  phone: {
    required: true,
    pattern: { value: /^01\d{9}$/, message: errorMessages.invalidPhone },
  },
  city: { required: true, message: errorMessages.required("City") },
  house: { required: true, message: errorMessages.required("House / Street") },
  area: { required: true, message: errorMessages.required("Area") },
  address: { required: true, message: errorMessages.required("Address") },
};