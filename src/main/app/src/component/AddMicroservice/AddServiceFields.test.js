import { validate } from './AddServiceFields'

describe("AddServiceFields functions", () => {
  let fieldValues = { title:"", description: "", email: "", url: ""};
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

  const validData = () => {
    fieldValues = {
      email: "joesmith@domain.com",
      description: "Description",
      url: "http://sample.com",
      title: "Title"
    };
    return fieldValues;
  }

  describe("validate() ", () => {
    it("should return error for empty fields", () => {
      // errors that should be displayed for empty field values
      let errors = {}
      errors.title = "Required";
      errors.email = "Required";
      errors.description = "Required";
      errors.url = "Required";
      expect(validate(fieldValues)).toEqual(errors);
    });

    it("should return error for invalid email field", () => {
      fieldValues = validData();
      let errors = {}
      errors.email = "Invalid email address";
      for (let i = 0; i < invalidEmails.length; i++) {
        fieldValues.email = invalidEmails[i];
        expect(validate(fieldValues)).toEqual(errors);
      }
    });

    it("should return error if title is more than 50 characters", () => {
      fieldValues = validData();
      let errors = {}
      errors.title = "Enter 50 characters or less";
      for(let i=0; i < 11; i++) {
        fieldValues.title += "Title";
      }
      expect(validate(fieldValues)).toEqual(errors);
    });

    it("should return error if description is more than 250 characters", () => {
      fieldValues = validData();
      let errors = {}
      errors.description = "Must be 250 characters or less";
      for(let i=0; i < 23; i++) {
        fieldValues.description += "Description";
      }
      expect(validate(fieldValues)).toEqual(errors);
    });
  })
})
