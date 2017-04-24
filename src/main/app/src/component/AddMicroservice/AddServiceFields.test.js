import { validate } from './AddServiceFields'

describe("AddServiceFields functions", () => {
  let fieldValues = {}
  const invalidEmails = [
    "plainaddress",
    "#@%^%#$@#$@#.com",
    "@domain.com",
    "Joe Smith <email@domain.com>",
    "email.domain.com",
    "email@domain@domain.com",
    "email@domain.com (Joe Smith)",
    "email@domain",
    "email@111.222.333.44444"
  ]

  describe("validate() ", () => {
    it("should return error for empty fields", () => {
      // Empty form field values
      fieldValues.title = "";
      fieldValues.email = "";
      fieldValues.description = "";
      fieldValues.url = "";
      // errors that should be displayed
      let errors = {}
      errors.title = "Required";
      errors.email = "Required";
      errors.description = "Required";
      errors.url = "Required";
      expect(validate(fieldValues)).toEqual(errors);
    });

    it("should return error for invalid email field", () => {
      fieldValues.title= "Title";
      fieldValues.description= "Description";
      fieldValues.url= "http://sample.com";
      let errors = {}
      errors.email = "Invalid email address";
      for (let i = 0; i < invalidEmails.length; i++) {
        fieldValues.email = invalidEmails[i];
        expect(validate(fieldValues)).toEqual(errors);
      }
    });

    it("should return error if title is more than 50 characters", () => {
      fieldValues.email= "joesmith@domain.com";
      fieldValues.description= "Description";
      fieldValues.url= "http://sample.com";
      fieldValues.title= "Title";
      let errors = {}
      errors.title = "Enter 50 characters or less";
      for(let i=0; i < 11; i++) {
        fieldValues.title += "Title";
      }
      expect(validate(fieldValues)).toEqual(errors);
    });

    it("should return error if description is more than 250 characters", () => {
      fieldValues.email= "joesmith@domain.com";
      fieldValues.description= "Description";
      fieldValues.url= "http://sample.com";
      fieldValues.title= "Title";
      let errors = {}
      errors.description = "Must be 250 characters or less";
      for(let i=0; i < 23; i++) {
        fieldValues.description += "Description";
      }
      expect(validate(fieldValues)).toEqual(errors);
    });
  })
})
