import React from 'react';
import { mount } from 'enzyme';
import { stub } from 'sinon';
import ImageList from '../ImageList';
import ImageListItem from '../ImageListItem';
import Root from '../../redux/Root';
import * as actions from '../../redux/actions/imagesActions';
import { mapArrayToObjectList } from '../../helpers';

const len = 20;
const list = mapArrayToObjectList(
  {},
  Array(len).fill(true).map((no_use, i) => {
    return {
      id: i,
      images: { '480w_still': {url: ''}, original: {url: ''} }
    }
  })
);

const cases = {
  no_error: {
    images: {
      offset: 10,
      list,
      error: null,
      loading: false,
    }
  },
  error: {
    images: {
      offset: 10,
      list,
      error: true,
      loading: false,
    }
  },
  loading: {
    images: {
      offset: 10,
      list,
      error: null,
      loading: true,
    }  
  }
};

describe('ImageList component:', function() {
  let windowEventMap;
  let wrapper;
  let fetchApiStub;

  beforeEach(function() {
    windowEventMap = {};
    window.addEventListener = jest.fn((e, cb) => windowEventMap[e] = cb);
    fetchApiStub = stub(actions, 'fetchApi');
    fetchApiStub.callsFake(() => ({ type: 'nothing' }));
  });

  afterEach(function() {
    if (wrapper) wrapper.unmount();
    if (fetchApiStub) fetchApiStub.restore();
  });

  describe('Given no errors, no loading:', function() {
    const state = cases.no_error;

    beforeEach(function() {
      wrapper = mount(
        <Root
          initialState = {state}
        >
          <ImageList/>
        </Root>
      );
    });

    it('should NOT show error:', function() {
      expect(wrapper.find('.error').length).toEqual(0);
    });

    it('should NOT display loading spinner', function() {
      expect(wrapper.find('.spinner-loader').get(0).props.style)
        .toHaveProperty('display', 'none');
    });

    it('should map list of images to ImageListItem', function() {
      expect(wrapper.find(ImageListItem).length).toEqual(len);
    });

    it('should call fetchApi() during componentDidMount() with initial offset value', function() {
      expect(fetchApiStub.calledOnce).toBeTruthy();
      expect(fetchApiStub.getCall(0).args).toEqual([state.images.offset]);
    });

    it('when scroll NOT to bottom, should not call fetchApi() again', function() {
      if (windowEventMap.scroll) {
        windowEventMap.scroll(null, 2, 1);
      }
  
      expect(fetchApiStub.callCount).toEqual(1);     
    });

    it('when scroll to bottom, should call fetchApi() again', function() {
      if (windowEventMap.scroll) {
        windowEventMap.scroll(null, 1, 1);
      }
  
      expect(fetchApiStub.calledTwice).toBeTruthy();
      expect(fetchApiStub.getCall(1).args).toEqual([state.images.offset + 1]);
    });
  });

  describe('when there is error', function() {
    beforeEach(function() {
      wrapper = mount(
        <Root
          initialState = {cases.error}
        >
          <ImageList/>
        </Root>
      );  
    });

    it('should show error', function() {
      expect(wrapper.find('.error').length).toEqual(1);
    });

    it('on scroll to bottom, should not call again fetchApi()', function() {
      if (windowEventMap.scroll) {
        windowEventMap.scroll(null, 1, 1);
      }
      expect(fetchApiStub.callCount).toEqual(1);
    });
  });

  describe('when fetchApi() is running', function() {
    beforeEach(function() {
      wrapper = mount(
        <Root
          initialState = {cases.loading}
        >
          <ImageList/>
        </Root>
      );
    });

    it ('should show loading spinner', function() {
      expect(wrapper.find('.spinner-loader').get(0).props.style)
        .toHaveProperty('display', 'block');
    });

    it('on scroll to bottom, should not call again fetchApi()', function() {
      if (windowEventMap.scroll) {
        windowEventMap.scroll(null, 1, 1);
      }
      expect(fetchApiStub.callCount).toEqual(1);
    });
  });
});