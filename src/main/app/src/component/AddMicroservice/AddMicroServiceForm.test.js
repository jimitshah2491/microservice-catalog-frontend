import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import { shallow } from 'enzyme';

import { AddMicroServiceForm } from './AddMicroServiceForm';
import EditForm from './EditForm';
import AddForm from './AddForm';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe("AddMicroServiceForm Component", () => {
  describe("render()", () => {
    it("should render the edit user form", () => {
      const props = {
        initialValues: {
          title:"Title",
          description: "Description",
          url: "http://sample.com",
          email: "sample@email.com"
        },
        handleSubmit: () => {},
        dispatch: () => {},
        invalid: true,
        submitting: false,
        location: {
          query: {
            id: "5891a9e1896ef39672afa257"
          }
        }
      }
      const wrapper = shallow(<AddMicroServiceForm {...props} />);
      expect(wrapper.contains(<EditForm />));
    });

    it("should render the add user form", () => {
      const props = {
        initialValues: {
        },
        handleSubmit: () => {},
        invalid: true,
        submitting: false,
        location: {
          query: {
          }
        }
      }
      const wrapper = shallow(<AddMicroServiceForm {...props} />);
      expect(wrapper.contains(<AddForm />));
    });
  });
})
