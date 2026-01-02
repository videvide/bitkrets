import { test, expect } from "vitest";
import {
  validateBlogIdIsNumber,
  validateBlogPostFormData,
  validateBlogTitleLength,
  validateCreateBlogPostFormData,
  validateDeleteBlogPostFormData,
  validateEditBlogPostFormData,
  validateEmailAddressStructure,
  validatePasswordStrength,
} from "../../../src/utils/validate";
import {
  blogTitleLength,
} from "../../../src/constants";
import { invalidCreateBlogPostFormData, invalidDeleteBlogPostFormData, invalidEditBlogPostFormData, validCreateBlogPostFormData, validDeleteBlogPostFormData, validEditBlogPostFormData } from "../../data/formData";

// Old test...
test("test validate formData is string", () => {
  expect(
    validateBlogPostFormData({
      blogId: "fakeID",
      blogTitle: "asd",
      blogText: "asd",
      submitType: "create",
    })
  ).toBe(true);
});

// With TDD I describe the functinality of my application through tests.
// "I want a function that validates email address structures".
// Then I make the tests pass by writing the corresponding functionality.
test("test returns valid email address", () => {
  const invalidEmailAddressStructure = "asd@asd";
  const validEmailAddressStructure = "asd@asd.se";
  expect(
    // "I want a function with this name to return false for invalid email address"
    validateEmailAddressStructure(invalidEmailAddressStructure)
  ).toBe(false);
  expect(
    // "I want a function with this name to return true for valid email address"
    validateEmailAddressStructure(validEmailAddressStructure)
  ).toBe(true);
});

// test passwordValidate function
test("test valid password strength", () => {
  // invalid password strengths
  const shortPassword = "not-16-chars";
  const notAnyLower = "ONLY-UPPER-CASE1";
  const notAnyNumber = "NOT-aNY-NUMBER!";
  const notAnySpecialCharacters = "notAnySpecialCharacters1";
  expect(validatePasswordStrength(shortPassword)).toBe(false);
  expect(validatePasswordStrength(notAnyLower)).toBe(false);
  expect(validatePasswordStrength(notAnyNumber)).toBe(false);
  expect(validatePasswordStrength(notAnySpecialCharacters)).toBe(false);

  // valid password strength
  const correctPasswordStrength = "This-is-a-valid-password-1;";
  expect(validatePasswordStrength(correctPasswordStrength)).toBe(true);
});

// test validateBlogId function
test("test valid blogId value", () => {
  // invalid blogId (!number)
  const invalidBlogId = "asd";
  expect(validateBlogIdIsNumber(invalidBlogId)).toBe(false);

  // valid blogId (number)
  const validBlogId = "123";
  expect(validateBlogIdIsNumber(validBlogId)).toBe(true);
});

// create function to generate random blogTitle
// give it a value for the number of characters
function generateRandomBlogTitle(blogTitleLength: number) {
  const characters = "ASDAFAASDdSGSAGAgsagsagSGAGagaGGAgaa";
  let randomBlogTitle = "";
  for (let i = 0; i <= blogTitleLength; i++) {
    randomBlogTitle += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomBlogTitle;
}

// test validate validBlogTitle
test("test validateBlogTitle", () => {
  // too short blog title
  expect(
    validateBlogTitleLength(
      generateRandomBlogTitle(blogTitleLength.minLength - 1)
    )
  ).toBe(false);
  // too long blog title
  expect(
    validateBlogTitleLength(
      generateRandomBlogTitle(blogTitleLength.maxLength + 1)
    )
  ).toBe(false);
});

// test validate createBlogPostFormData
test("test validateCreateBlogPostFormData", () => {
  // test invalid CreateBlogPostFormData
  invalidCreateBlogPostFormData.map((formData) => {
    expect(validateCreateBlogPostFormData(formData)).toBe(false);
  });
  // test valid CreateBlogPostFormData
  expect(validateCreateBlogPostFormData(validCreateBlogPostFormData)).toBe(true);
});

// test validateEditBlogPostFormData
test("test validateEditBlogPostFormData", () => {
  // test invalid EditBlogPostFormData
  invalidEditBlogPostFormData.map((formData) => {
    expect(validateEditBlogPostFormData(formData)).toBe(false);
  });
  // test valid EditBlogPostFormData
  expect(validateEditBlogPostFormData(validEditBlogPostFormData)).toBe(true);
});

// test validateDeleteBlogPostFormData
test("test validateDeleteBlogPostFormData", () => {
  // test invalid DeleteBlogPostFormData
  expect(validateDeleteBlogPostFormData(invalidDeleteBlogPostFormData)).toBe(false);
  // test valid DeleteBlogPostFormData
  expect(validateDeleteBlogPostFormData(validDeleteBlogPostFormData)).toBe(true);
})