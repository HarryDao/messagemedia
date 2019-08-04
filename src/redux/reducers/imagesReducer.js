import { mapArrayToObjectList } from '../../helpers';
import {
  FETCHING_API,
  FETCH_API,
  FETCH_API_FAIL,
  SELECT_IMAGE
} from '../constants';

const INITIAL_STATE = {
  list: {},
  offset: 0,
  loading: false,
  error: null,
  selected: null,
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCHING_API:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_API:
      const { data, offset } = action.payload;
      const newList = mapArrayToObjectList(state.list, data);
      return {
        ...state,
        loading: false,
        error: null,
        offset,
        list: newList,
      };
    case FETCH_API_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case SELECT_IMAGE:
      return {
        ...state,
        selected: action.payload
      }
    default:
      return state;
  }
}