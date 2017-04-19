import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { createLogger } from 'redux-logger';
import { shallow } from 'enzyme';
import nock from 'nock';

import * as catalog from './catalog';
import catalogJSONData from 'json!/../../../fixtures/catalog.json';
// import BACKEND_URL from '../../env-config.js';
import reducer from './catalog';
import { LoadingStates } from '../../utils/common';

describe("actions", () => {
  const middlewares = [ thunk ];
  const mockStore = configureMockStore(middlewares);

  afterEach(() => {
    nock.cleanAll();
  })

  it("should create an action to request catalog", ()=> {
    const expectedAction = {
      type: catalog.REQUEST
    }
    expect(catalog.request()).toEqual(expectedAction);
  });

  // async action
  it("should create an action to receive catalog", ()=> {
    // nock(BACKEND_URL).get('/catalog').reply(200, catalogJSONData);
    //
    // const expectedAction = [
    //   { type: catalog.REQUEST },
    //   { type: catalog.RECEIVE_SUCCESS, payload: catalogJSONData }
    // ]
    // const store = mockStore({catalogData: []});
    //
    // return store.dispatch(catalog.fetchMicroservices)
    //   .then(() => {
    //     expect(store.getActions()).toEqual(expectedAction);
    //   })
  });

  // async action
  it("should create an action to initialize the edit form", ()=> {

  });

  it("should create an action to filter data for search", ()=> {
    const payload="searched text";
    const expectedAction = {
      type: catalog.FILTER_DATA,
      payload
    }
    expect(catalog.filterText(payload)).toEqual(expectedAction);
  });
})

describe("reducers", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      catalogData: [],
      loading: LoadingStates.CLEAN,
      filterText: '',
      errorfetching: false
    })
  });

  it("should handle fetchMicroservices request calls", () => {
    expect(reducer({
      catalogData: [],
      loading: LoadingStates.CLEAN,
      filterText: '',
      errorfetching: false
    }, {
      type:catalog.REQUEST
    })).toEqual({
      catalogData: [],
      loading: LoadingStates.LOADING,
      filterText: '',
      errorfetching: false
    })
  });

  it("should handle fetchMicroservices receive reducer", () => {
    expect(reducer({
      catalogData: [],
      loading: LoadingStates.LOADING,
      filterText: '',
      errorfetching: false
    }, {
      type:catalog.RECEIVE_SUCCESS,
      payload: catalogJSONData
    })).toEqual({
      catalogData: catalogJSONData._embedded.catalog.map(function(obj){
        return {
          id: obj._links.self.href.substring(obj._links.self.href.lastIndexOf("/")+1, obj._links.self.href.length),
          catalog: obj
        }
      }),
      filterText: '',
      loading: LoadingStates.LOADED,
      errorfetching: false,
    })
  });

  it("should handle errors in receive call", () => {
    expect(reducer({
      catalogData: [],
      loading: LoadingStates.LOADING,
      filterText: '',
      errorfetching: false
    }, {
      type:catalog.RECEIVE_ERROR
    })).toEqual({
      catalogData: [],
      filterText: '',
      loading: LoadingStates.LOADED,
      errorfetching: true,
    })
  });

  it("should handle initializeFormHandler reducer", () => {
    expect(reducer({
      catalogData: [],
      loading: LoadingStates.CLEAN,
      filterText: '',
      errorfetching: false
    }, {
      type:catalog.INITIALIZE_EDIT_FORM,
      payload: catalogJSONData
    })).toEqual({
      formData: catalogJSONData
    })
  });

  it("should handle filterDataHandler reducer", () => {
    expect(reducer({
      catalogData: [],
      loading: LoadingStates.CLEAN,
      filterText: '',
      errorfetching: false
    }, {
      type:catalog.FILTER_DATA,
      payload: catalogJSONData
    })).toEqual({
      catalogData: [],
      loading: LoadingStates.CLEAN,
      errorfetching: false,
      filterText: catalogJSONData
    })
  });
})
