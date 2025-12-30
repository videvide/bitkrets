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
  blogPostFormSubmitType,
  blogTitleLength,
} from "../../../src/constants";
import type {
  CreateBlogPostFormData,
  DeleteBlogPostFormData,
  EditBlogPostFormData,
} from "../../../src/types/bitkrets";

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

const invalidCreateBlogPostFormData: CreateBlogPostFormData[] = [
  {
    blogTitle: "This is a valid blog title",
    // invalid blog text
    blogText: "",
    submitType: blogPostFormSubmitType.create,
  },
  {
    // invalid blog title
    blogTitle: "",
    blogText: "This is valid blog text",
    submitType: blogPostFormSubmitType.create,
  },
  {
    blogTitle: "This is valid blog title",
    blogText: "This is valid blog text",
    // invalid submit type
    submitType: "",
  },
];

// valid CreateBlogPostFormData
const validCreateBlogPostFormData: CreateBlogPostFormData = {
  blogTitle: "Valid blog title",
  blogText: "Valid blog text",
  submitType: blogPostFormSubmitType.create,
};

// test validate createBlogPostFormData
test("test validateCreateBlogPostFormData", () => {
  // test invalid CreateBlogPostFormData
  invalidCreateBlogPostFormData.map((formData) => {
    expect(validateCreateBlogPostFormData(formData)).toBe(false);
  });
  // test valid CreateBlogPostFormData
  expect(validateCreateBlogPostFormData(validCreateBlogPostFormData)).toBe(true);
});

// invalid EditBlogPostFormData
const invalidEditBlogPostFormData: EditBlogPostFormData[] = [
  {
    // invalid blogId
    blogId: "asd",
    blogTitle: "This is a valid blog title",
    blogText: "Valid blog text",
    submitType: blogPostFormSubmitType.edit,
  },
  {
    blogId: "123",
    // invalid blog title
    blogTitle: "",
    blogText: "This is valid blog text",
    submitType: blogPostFormSubmitType.edit,
  },
  {
    blogId: "123",
    blogTitle: "Valid blog title",
    // invalid blog text
    blogText: "",
    submitType: blogPostFormSubmitType.edit,
  },
  {
    blogId: "123",
    blogTitle: "This is valid blog title",
    blogText: "This is valid blog text",
    // invalid submit type
    submitType: "",
  },
];

// valid EditBlogPostFormData
const validEditBlogPostFormData: EditBlogPostFormData = {
  blogId: "123",
  blogTitle: "This is valid blog title",
  blogText: "Valid blog text",
  submitType: blogPostFormSubmitType.edit,
};

// test validateEditBlogPostFormData
test("test validateEditBlogPostFormData", () => {
  // test invalid EditBlogPostFormData
  invalidEditBlogPostFormData.map((formData) => {
    expect(validateEditBlogPostFormData(formData)).toBe(false);
  });
  // test valid EditBlogPostFormData
  expect(validateEditBlogPostFormData(validEditBlogPostFormData)).toBe(true);
});

// invalid DeleteBlogPostFormData
const invalidDeleteBlogPostFormData: DeleteBlogPostFormData = {
  blogId: "asd",
  submitType: blogPostFormSubmitType.delete
}

// valid DeleteBlogPostFormData
const validDeleteBlogPostFormData: DeleteBlogPostFormData = {
  blogId: "123",
  submitType: blogPostFormSubmitType.delete
}

// test validateDeleteBlogPostFormData
test("test validateDeleteBlogPostFormData", () => {
  // test invalid DeleteBlogPostFormData
  expect(validateDeleteBlogPostFormData(invalidDeleteBlogPostFormData)).toBe(false);
  // test valid DeleteBlogPostFormData
  expect(validateDeleteBlogPostFormData(validDeleteBlogPostFormData)).toBe(true);
})