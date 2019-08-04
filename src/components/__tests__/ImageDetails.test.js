import React from 'react';
import { mount } from 'enzyme';
import { stub } from 'sinon';
import Root from '../../redux/Root';
import ImageDetails from '../ImageDetails';
import * as actions from '../../redux/actions/imagesActions';

const sampleImage = {
  id: 'testId',
  user: 'testUser',
  userImage: 'testUserImage',
  url: 'testUrl',
  title: 'testTitle',
}

const state = {
  images: {
    list: { [sampleImage.id]: sampleImage },
    selected: null
  }
}

describe('ImageDetails component:', function() {
  let wrapper;
  let fakeSelect;

  afterEach(function() {
    if (wrapper) wrapper.unmount();
    if (fakeSelect) fakeSelect.restore();
  });

  describe('When NO image is selected', function() {
    beforeEach(function() {
      wrapper = mount(
        <Root
          initialState={state}
        >
          <ImageDetails />
        </Root>
      );
    });

    it('should NOT display', function() {
      expect(wrapper.find('.ImageDetails').get(0).props.style)
        .toHaveProperty('display', 'none');
    });
  });

  describe('When an image is selected', function() {
    beforeEach(function() {
      wrapper = mount(
        <Root
          initialState={{
            images: {
              ...state.images,
              selected: sampleImage.id
            }
          }}
        >
          <ImageDetails />
        </Root>
      );
    });

    it('should display', function() {
      expect(wrapper.find('.ImageDetails').get(0).props.style)
        .toHaveProperty('display', 'flex');
    });

    it('should show the image', function() {
      expect(wrapper.find('img').get(0).props).toEqual({
        src: sampleImage.url,
        alt: sampleImage.title
      });
    });

    it('should show the close button', function() {
      expect(wrapper.find('.close-x').length).toEqual(1);
    });
  });

  describe('when user click', function() {
    beforeEach(function() {
      fakeSelect = stub(actions, 'selectImage');
      fakeSelect.callsFake(() => ({type: 'nothing'}));

      wrapper = mount(
        <Root
          initialState={{
            images: {
              ...state.images,
              selected: sampleImage.id
            }
          }}
        >
          <ImageDetails />
        </Root>
      );
    });

    it('should NOT do anything if click on image', function() {
      wrapper.find('img').simulate('click');
      expect(fakeSelect.callCount).toEqual(0);
    });

    it('should hide the whole component when upon click on Close X', function() {
      wrapper.find('.close-x').simulate('click');
      expect(fakeSelect.callCount).toEqual(1);
      expect(fakeSelect.getCall(0).args).toEqual([null]);
    });
  });
});