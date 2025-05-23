// src/components/utils.js
import validator from 'validator';

// Input validation function
export const validateStaffInput = (data) => {
  const errors = {};

  // Validate name
  if (!data.name || !validator.isLength(data.name, { min: 2, max: 50 })) {
    errors.name = 'Name must be between 2 and 50 characters.';
  }

  // Validate email
  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = 'Invalid email address.';
  }

  // Validate phone number
  if (!data.phone || !validator.isMobilePhone(data.phone, 'en-US')) {
    errors.phone = 'Invalid phone number.';
  }

  // Validate hire date
  if (!data.hireDate || !validator.isDate(data.hireDate)) {
    errors.hireDate = 'Invalid hire date.';
  }

  // Validate certifications
  if (!data.certifications || !validator.isLength(data.certifications, { min: 2, max: 100 })) {
    errors.certifications = 'Certifications must be between 2 and 100 characters.';
  }

  return errors;
};

// Input sanitization function
export const sanitizeStaffInput = (data) => {
  return {
    name: validator.escape(data.name.trim()),
    role: validator.escape(data.role.trim()),
    department: validator.escape(data.department.trim()),
    email: validator.normalizeEmail(data.email.trim()),
    phone: validator.escape(data.phone.trim()),
    hireDate: validator.escape(data.hireDate.trim()),
    certifications: validator.escape(data.certifications.trim()),
  };
};