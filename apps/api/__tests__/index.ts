import * as utils from './utils';

// Test 1: Email Validation

test('Invalid email: Short!', () => {
  expect(utils.isValidEmail('Short!')).toBe(false);
});

// Email must contain '@' symbol
test("Invalid email: Missing '@' symbol", () => {
  expect(utils.isValidEmail('invalidEmail.com')).toBe(false);
});

// Email must have at least one character before '@'
test("Invalid email: No characters before '@'", () => {
  expect(utils.isValidEmail('@domain.com')).toBe(false);
});

// Email must have at least one character after '@'
test("Invalid email: No characters after '@'", () => {
  expect(utils.isValidEmail('email@')).toBe(false);
});

// Email must be in a valid format
test('Invalid email: Invalid format', () => {
  expect(utils.isValidEmail('email@domain')).toBe(false);
});

// Valid email should pass
test('Valid email: Passes validation', () => {
  expect(utils.isValidEmail('valid.email@example.co')).toBe(true);
});

// Test 2: Authenticate user

test('Successful Authentication', () => {
  expect(utils.authenticateUser('member123', 'password')).toBe(true);
});

test('Failed Authentication', () => {
  expect(utils.authenticateUser('invalid_user', 'invalid_password')).toBe(
    false,
  );
});

// Test 3: Can Access Correct Election for Flat Earth Society (FES)

test('Member can access active Elections of their Society', () => {
  expect(utils.canAccessElection('member', 'FES', 'active')).toBe(true);
});

test("Member can't access inactive election of their Society", () => {
  expect(utils.canAccessElection('member', 'FES', 'inactive')).toBe(false);
});

test("Member can't access active election of other Societies", () => {
  expect(utils.canAccessElection('member', 'PAX', 'inactive')).toBe(false);
});

test('Officer can access active elections of their society', () => {
  expect(utils.canAccessElection('officer', 'FES', 'active')).toBe(true);
});

test('Officer can access inactive elections of their society', () => {
  expect(utils.canAccessElection('officer', 'FES', 'inactive')).toBe(true);
});

test("Officer can't access elections of societies they're not a member of", () => {
  expect(utils.canAccessElection('officer', 'PAX', 'inactive')).toBe(false);
});

test('Employees can access active elections of assigned society', () => {
  expect(utils.canAccessElection('employee', 'FES', 'active')).toBe(true);
});

test('Employees can access inactive elections of assigned society', () => {
  expect(utils.canAccessElection('employee', 'FES', 'inactive')).toBe(true);
});

test('Admins can access all elections', () => {
  expect(utils.canAccessElection('admin', null, 'active')).toBe(true);
});
