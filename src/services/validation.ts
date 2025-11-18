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
      hasUppercase: (value: string) =>
        /[A-Z]/.test(value) ||
        "Password must contain at least one uppercase letter",
      hasLowercase: (value: string) =>
        /[a-z]/.test(value) ||
        "Password must contain at least one lowercase letter",
      hasNumber: (value: string) =>
        /\d/.test(value) || "Password must contain at least one number",
      hasSpecialChar: (value: string) =>
        /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
        "Password must contain at least one special character",
    },
  }),
  
};

export default validation;
