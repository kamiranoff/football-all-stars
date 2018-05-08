import React from 'react';
import Card from '../Card';

import renderer from 'react-test-renderer';

const item = {
  id: 1,
  text: 'hello',
  uri: 1,
}

it('renders without crashing', () => {
  const rendered = renderer.create(<Card item={item} />).toJSON();
  expect(rendered).toMatchSnapshot();
});
