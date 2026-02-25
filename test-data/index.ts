import { UserFormData } from '../page-objects';

/**
 * Test data for form submissions
 */
export const testUsers = {
  validUser: {
	name: 'Test User',
	email: 'test@example.com'
  },

  practiceFormUser: {
	firstName: 'Juan',
	lastName: 'Perez',
	email: 'juan.perez@example.com',
	gender: 'Male' as const,
	mobile: '1234567890',
	dateOfBirth: '15 Jan 1990',
	hobbies: ['Sports'],
	currentAddress: 'Av. Siempre Viva 123, Springfield'
  } as UserFormData,

  alternativeUser: {
	firstName: 'Jane',
	lastName: 'Doe',
	email: 'jane.doe@test.com',
	gender: 'Female' as const,
	mobile: '9876543210',
	dateOfBirth: '20 Dec 1985',
	hobbies: ['Reading', 'Music'],
	currentAddress: '456 Oak Street, Los Angeles'
  } as UserFormData
};

/**
 * Common test messages and expected outputs
 */
export const testMessages = {
  navigationSuccess: 'All the sections are visible on the page',
  formSubmissionSuccess: 'Thanks for submitting the form',
  dragDropSuccess: 'Dropped!'
};

/**
 * URL patterns for validation
 */
export const urlPatterns = {
  home: '/',
  elements: /.*elements/,
  textBox: /.*text-box/,
  forms: /.*forms/,
  practiceForm: /.*automation-practice-form/,
  widgets: /.*widgets/,
  interactions: /.*interaction/,
  bookStore: /.*books/
};