import argon2 from 'argon2';

import {
  InternalServerError,
  ValidationError,
} from './error.js';

export async function hashPassword(password) {
  passwordSignUpValidation(password);

  try {
    return await argon2.hash(password);
  } catch (cause) {
    throw new InternalServerError('Failed to hash the password.', { cause });
  }
}

export async function verifyPassword(hash, password) {
  if (typeof password !== 'string') {
    throw new ValidationError('Password must be a string.');
  }

  if (typeof hash !== 'string' || hash.length === 0) {
    throw new InternalServerError('The stored password hash is invalid.');
  }

  try {
    return await argon2.verify(hash, password);
  } catch (cause) {
    throw new InternalServerError('Failed to verify the password.', { cause });
  }
}

export function passwordSignUpValidation(password) {
  if (typeof password !== 'string') {
    throw new ValidationError('Password must be a string.', {
      details: { password: ['Must be a string.'] },
    });
  }

  const validationErrors = [];

  if (!passwordSizeValidation(password)) {
    validationErrors.push('Must contain at least 8 characters.');
  }
  if (!passwordLowercaseValidation(password)) {
    validationErrors.push('Must contain a lowercase letter.');
  }
  if (!passwordUppercaseValidation(password)) {
    validationErrors.push('Must contain an uppercase letter.');
  }
  if (!passwordNumberValidation(password)) {
    validationErrors.push('Must contain a number.');
  }
  if (!passwordSpecialCharacterValidation(password)) {
    validationErrors.push('Must contain one of these characters: @$!%*?&.');
  }

  if (validationErrors.length > 0) {
    throw new ValidationError('Password does not meet the requirements.', {
      details: { password: validationErrors },
    });
  }

  return true;
}

function passwordSizeValidation(password) {
  return password.length >= 8;
}

function passwordLowercaseValidation(password) {
  return /[a-z]/.test(password);
}

function passwordUppercaseValidation(password) {
  return /[A-Z]/.test(password);
}

function passwordNumberValidation(password) {
  return /\d/.test(password);
}

function passwordSpecialCharacterValidation(password) {
  return /[@$!%*?&]/.test(password);
}