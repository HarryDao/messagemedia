import QS from 'query-string';
import {
  GIPHY_KEY,
  IMAGES_LIMIT,
  BASE_API
} from '../configs';

export const mapArrayToObjectList = ((list, arr) => {
  if (!arr.length) return list;
  
  const newList = { ...list };

  arr.forEach(item => {
    const {
      id,
      images,
      title,
      user,
    } = item;

    newList[id] = {
      id: id,
      url: images['480w_still'].url,
      original: images.original.url,
      title,
      user: (user && user.display_name) || 'Anonymous',
      userImage: (user && user.avatar_url) || '', 
    }
  });

  return newList;
});

export const generateUrl = (offset = 0) => {
  const queries = {
    api_key: GIPHY_KEY,
    limit: IMAGES_LIMIT,
    offset: offset * IMAGES_LIMIT
  }
  return `${BASE_API}?${QS.stringify(queries)}`;
}