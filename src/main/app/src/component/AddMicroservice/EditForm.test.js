import React from 'react';
import { shallow, mount } from 'enzyme';
import { SubmissionError } from 'redux-form';
import sinon from 'sinon';
import { Alert, Button , PageHeader , Jumbotron , FormGroup } from 'react-bootstrap';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import EditForm from './EditForm';
import AddMicroServiceForm from './AddMicroServiceForm';

describe("EditForm component", () => {
  let initialValues, onSubmitResponse, onSubmitAdd, submitSucceeded, error, handleSubmit, submitting, reset, pristine;
  onSubmitResponse = Promise.resolve();
  let mockStore = configureStore([]);
  let store = mockStore({});

  let setup = () => {
    onSubmitAdd = sinon.stub().returns(onSubmitResponse);
    reset = sinon.spy();
    const props = {
      onSubmitAdd,
      submitSucceeded:false,
      error:null,
      submitting:false,
      reset,
      handleSubmit:()=>{},
      pristine:true,
      initialValues:{
        title: "Title",
        description: "Description",
        url: "http://sample.com",
        email: "sample@email.com"
      }
    }
    return props;
  }

  describe("when form rendered initially", () => {
    it("should render the initial state of form correctly", ()=>{
      const props = setup();
      const wrapper = shallow(<EditForm {...props} />);
      const resetButton = wrapper.find('Button[type="reset"]');
      expect(wrapper.contains(<PageHeader>Edit MicroService</PageHeader>));
      expect(wrapper.find("Jumbotron").length).toBe(1);
      expect(wrapper.find("FormGroup").length).toBe(1);
      expect(wrapper.find("Button").length).toBe(3);
      // console.log(wrapper.find('input[name="title"]').text());
      // expect(wrapper.find('input[name="title"]').text()).toBe(initialValues.name);
      // expect(wrapper.find('input[name="description"]').text()).toBe(initialValues.description);
      // expect(wrapper.find('input[name="url"]').text()).toBe(initialValues.url);
      // expect(wrapper.find('input[name="email"]').text()).toBe(initialValues.email);
      // Initially No Alerts
      expect(wrapper.find("Alert").length).toBe(0);
      // Initially Clear button is disabled as pristine is true and submitting is false
      expect(resetButton.props().disabled).toBe(true);
    });
  })

  describe("when form is submitting", () => {
    it("should disable submit button", () => {
      const props = setup();
      props.submitting=true;
      const wrapper = shallow(<EditForm {...props} />);
      const submitButton = wrapper.find('Button[type="submit"]');
      expect(submitButton.props().disabled).toBe(true);
    });
  })

  describe("when form submitted", () => {
    it("should call reset after form submitted", ()=> {
      let props = setup();
      props={
        ...props,
        location: {
          query: {
            id: "5891a9e1896ef39672afa257"
          }
        }
      }

      // const wrapper = mount(<Provider store={store}>
      //                        <AddMicroServiceForm {...props} />
      //                       </Provider>);
      // wrapper.find('form').simulate("submit");
    });

    it("should display Success message on successful form submisison", ()=> {
      const props = setup();
      props.submitSucceeded=true;
      const wrapper = shallow(<EditForm {...props} />);
      const successMessage = wrapper.find("Alert");
      expect(successMessage.find("strong").text()).toBe("Microservice Successfully Edited!");
      expect(successMessage.length).toBe(1);
    });

    it("should display Error message on form submisison with error", ()=> {
      const props = setup();
      props.error = "error";
      const wrapper = shallow(<EditForm {...props} />);
      const successMessage = wrapper.find("Alert");
      expect(successMessage.find("strong").text()).toBe("Sorry! Some error has occurred...");
      expect(successMessage.length).toBe(1);
    });

  })
})
