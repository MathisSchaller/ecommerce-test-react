//enzyme
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Article from './Article';
import { Link } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe('<Article />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Article />);
  });

  it('should render 1 <Link /> if no props were passed', () => {
    expect(wrapper.find(Link)).toHaveLength(1);
  });

  it('should render two <button /> if props addClick and removeClick are defined', () => {
    wrapper.setProps({
      addClick: true,
      removeClick: true,
    });
    expect(wrapper.find('button')).toHaveLength(2);
  });

  it('should render 1 <button /> if props addClick and price are defined', () => {
    wrapper.setProps({
      prix: 0,
      addClick: true,
    });
    expect(
      wrapper.contains(<button onClick={true}>EUR 0</button>)
    ).toEqual(true);
  });
});
