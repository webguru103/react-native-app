export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordFormData {
  phone: string;
}

export interface PhoneCodeFormData {
  code: string;
}

export interface NewPasswordFormData {
  password: string;
  confirmPassword: string;
}
