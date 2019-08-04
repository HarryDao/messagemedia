import {
  GIPHY_KEY,
  IMAGES_LIMIT,
  BASE_API
} from '../../configs';
import {
  mapArrayToObjectList,
  generateUrl
} from '../';
const sample_arr = [
  {
    id: 0,
    images: {
      '480w_still': {url: 'url1'},
      original: { url: 'url2' }
    },
    title: 'titl1',
    user: {
      display_name: 'ho',
      avatar_url: 'ava1'
    }
  },
  {
    id: 1,
    images: {
      '480w_still': {url: 'url3'},
      original: { url: 'url4' }
    },
    title: 'titl2',
    user: {
      display_name: 'ho2',
      avatar_url: 'ava2'
    }
  }
];

const expected = {
  '0': {
    id: 0,
    url: 'url1',
    original: 'url2',
    title: 'titl1',
    user: 'ho',
    userImage: 'ava1'
  },
  '1': {
    id: 1,
    url: 'url3',
    original: 'url4',
    title: 'titl2',
    user: 'ho2',
    userImage: 'ava2'
  } 
}

const offset = 3;
const expectedUrl = `${BASE_API}?api_key=${GIPHY_KEY}&limit=${IMAGES_LIMIT}&offset=${IMAGES_LIMIT * offset}`;

describe('helpers:', function() {
  describe('mapArrayToObjectList()', function() {
    it('should return same object if pass in empty array', function() {
      expect(mapArrayToObjectList({}, [])).toEqual({});
    });
  
    it('should mapArrayToObjectList() correctly', function() {
      expect(mapArrayToObjectList({}, sample_arr)).toEqual(expected);
    });
  });

  it ('should generateUrl() correctly', function() {
    expect(generateUrl(offset)).toEqual(expectedUrl);
  });
});