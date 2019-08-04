import { stub } from 'sinon';
import * as helpers from '../../../helpers';
import reducer from '../imagesReducer';
import {
  FETCHING_API,
  FETCH_API,
  FETCH_API_FAIL,
  SELECT_IMAGE,
} from '../../constants';

const state = {};
const action1 = {
  type: FETCHING_API,
}
const action2 = {
  type: FETCH_API,
  payload: {
    offset: 3,
    data: [1, 2, 3]
  }
}
const action3 = {
  type: FETCH_API_FAIL,
  payload: 'testError'
}
const action4 = {
  type: SELECT_IMAGE,
  payload: 'testID'
}
const actionNonSense = {
  type: 'totally_non_sense'
}

describe('imagesReducer:', function() {
  let mapStub;

  beforeEach(function() {
    mapStub = stub(helpers, 'mapArrayToObjectList');
  });

  afterEach(function() {
    if (mapStub) mapStub.restore();
  });

  it('should return original state if not match any string', function() {
    expect(reducer(state, actionNonSense)).toEqual(state);
  });

  it('should return correctly when loading api is signed', function() {
    expect(reducer(state, action1)).toEqual({
      ...state,
      loading: true,
      error: null
    });
  });

  it('should return correctly when successfuly api is signed', function() {
    const fakeList = ['not true', 'not true'];
    mapStub.callsFake(() => fakeList);

    expect(reducer(state, action2)).toEqual({
      ...state,
      loading: false,
      error: null,
      offset: action2.payload.offset,
      list: fakeList
    });
  });

  it('should return correctly when failed api is signed', function() {
    expect(reducer(state, action3)).toEqual({
      ...state,
      loading: false,
      error: action3.payload
    });
  });

  it('should return correctly when selecting image is signed', function() {
    expect(reducer(state, action4)).toEqual({
      ...state,
      selected: action4.payload
    });
  });
});