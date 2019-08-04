import Axios from 'axios';
import { generateUrl } from '../../helpers';
import {
  FETCHING_API,
  FETCH_API,
  FETCH_API_FAIL,
  SELECT_IMAGE,
} from '../constants';

export const fetchApi = (offset) => async dispatch => {
  try {
    dispatch({ type: FETCHING_API });

    const url = generateUrl(offset);
    const { data: { data } } = await Axios.get(url);

    dispatch({
      type: FETCH_API,
      payload: { offset, data },
    });
  }
  catch(error) {
    dispatch({
      type: FETCH_API_FAIL,
      payload: error
    });
  }
}

export const selectImage = (id) => ({
  type: SELECT_IMAGE,
  payload: id,
});

