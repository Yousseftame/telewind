const validation = {
  EMAIL_VALIDATION: {
    required: "Email is required",
    pattern: {
      value: /\S+@\S{3,}\.\S{2,}/,
      message: "Enter a valid email",
    },
  },
  PASSWORD_VALIDATION: (required: string) => ({
    required,
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
    validate: {
      hasLowercase: (value: string) =>
        /[a-z]/.test(value) ||
        "Password must contain at least one lowercase letter",
    },
  }),

  //validation for Name
  NAME_VALIDATION: {
    required: "Name is required",
    pattern: {
      value: /^[\p{L} ]{3,}$/u , 
      message: "Enter a valid name",
    },
  },
};

export default validation;
