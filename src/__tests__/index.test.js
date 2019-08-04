import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { stub } from 'sinon';
import { renderToDOM } from '../index';
import App from '../components/App';

describe('index.js:', function() {
  let fakeRender;
  let wrapper;

  beforeEach(function() {
    fakeRender = stub(ReactDOM, 'render');
    fakeRender.callsFake(child => {
      wrapper = shallow(child);
    });
  });

  afterEach(function() {
    if (fakeRender) fakeRender.restore();
  });

  it('should call ReactDOM.render()', function() {
    renderToDOM();
    expect(fakeRender.callCount).toEqual(1);
  });

  it('should pass in component App', function() {
    expect(wrapper.find(App).length).toEqual(1);
  });
}); 