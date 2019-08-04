import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import ImageList from '../ImageList';
import ImageDetails from '../ImageDetails';

describe('App component:', function() {
  let wrapper;

  beforeEach(function() {
    wrapper = shallow(<App />);
  });

  it('should render ImageList component', function() {
    expect(wrapper.find(ImageList)).toHaveLength(1);
  });

  it('should render ImageDetails component', function() {
    expect(wrapper.find(ImageDetails)).toHaveLength(1);
  });
});