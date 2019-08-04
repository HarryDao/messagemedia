import React from 'react';
import { mount } from 'enzyme';
import { fake } from 'sinon';
import ImageListItem from '../ImageListItem';

const props = {
  id: 'testId',
  user: 'testUser',
  userImage: 'testUserImage',
  url: 'testUrl',  
}

describe('ImageListItem component:', function() {
  let wrapper;

  afterEach(function() {
    if (wrapper) wrapper.unmount();
    if (props.onSelect) delete props.onSelect;
  });

  describe('Given user is available', function() {
    beforeEach(function() {  
      wrapper = mount(
        <ImageListItem
          {...props}
        />
      );
    });

    it('should render image', function() {
      expect(wrapper.find('.image-container').get(0).props.style)
        .toHaveProperty('backgroundImage', `url(${props.url})`);
    });
  
    it('should have views, comments, and likes counts', function() {
      expect(wrapper.find('.fa-eye').length).toEqual(1);
      expect(wrapper.find('.fa-comment').length).toEqual(1);
      expect(wrapper.find('.fa-heart').length).toEqual(1);
    });
  
    it('should render user avatar and name', function() {
      expect(wrapper.find('.fa-user').length).toEqual(0);
      expect(wrapper.find('img').get(0).props.src).toEqual(props.userImage);
      expect(wrapper.find('.user').childAt(1).text()).toEqual(props.user);
    });
  });

  describe('Given user is NOT available', function() {
    it('should render default user icon', function() {
      wrapper = mount(
        <ImageListItem
          {...props}
          userImage=''
        />
      );
      expect(wrapper.find('img').length).toEqual(0);
      expect(wrapper.find('.fa-user').length).toEqual(1);
    });
  });

  it('should call onSelect() upon user click and pass in image id', function() {
    props.onSelect = fake();
    wrapper = mount(
      <ImageListItem
        {...props}
      />
    );
    wrapper.find('.image').simulate('click');
    expect(props.onSelect.callCount).toEqual(1);
    expect(props.onSelect.getCall(0).args).toEqual([props.id]);
  });
});
