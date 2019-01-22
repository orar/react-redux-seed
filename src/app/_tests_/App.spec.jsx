import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('App', function () {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<App />);
  });

  it('should render an .appContainer element', function () {
    expect(wrapper.is('.appContainer')).toBeTruthy();
  });

  it('Should render an h1 element with a futureText class', () => {
    const h1 = wrapper.children().first();
    expect(h1.is('h1.futureText')).toBeTruthy();
  })
});
