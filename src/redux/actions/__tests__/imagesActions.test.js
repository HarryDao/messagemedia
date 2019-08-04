import Axios from 'axios';
import { stub } from 'sinon';
import { fetchApi, selectImage } from '../imagesActions';
import { generateUrl } from '../../../helpers';
import {
  FETCHING_API,
  FETCH_API,
  FETCH_API_FAIL,
  SELECT_IMAGE,
} from '../../constants';

const sample_offset = 3;
const sample_url = generateUrl(sample_offset);

describe('imagesActions:', function() {
  let apiStub;
  let dispatches = [];
  const dispatch = (action) => dispatches.push(action);

  beforeEach(function() {
    dispatches = [];
  });

  afterEach(function() {
    if (apiStub) apiStub.restore();
  });

  describe('fetchApi() action:', function() {
    beforeEach(function() {
      apiStub = stub(Axios, 'get');
    });

    it('dispatch loading signal to reducer before send api', async function(){
      await fetchApi(sample_offset)(dispatch);
      expect(dispatches[0].type).toEqual(FETCHING_API);
    });

    it ('should fetch a correct url upon calling', async function() {
      apiStub.callsFake(() => {});
      await fetchApi(sample_offset)(dispatch);

      expect(apiStub.callCount).toEqual(1);
      expect(apiStub.getCall(0).args).toEqual([sample_url]);
    });

    it('should dispatch error signal to reducer upon error', async function() {
      const error = new Error('test');
      apiStub.callsFake(() => { throw error });
      await fetchApi(sample_offset)(dispatch);
      expect(dispatches[1]).toEqual({
        type: FETCH_API_FAIL,
        payload: error
      });
    });

    it('should dispatch data signal to reducer upon fetching successfully', async function() {
      const data = [1, 2];
      apiStub.callsFake(() => ({
        data: { data }
      }));
      await fetchApi(sample_offset)(dispatch);
      expect(dispatches[1]).toEqual({
        type: FETCH_API,
        payload: {
          offset: sample_offset,
          data
        }
      });
    });
  });
});

describe('selectImage() action:', function(){
  it('should return correct information for reducer', function() {
    const sample_id = '1234';
    expect(selectImage(sample_id)).toEqual({
      type: SELECT_IMAGE,
      payload: sample_id
    });
  });
})
