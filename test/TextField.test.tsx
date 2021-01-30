import React from 'react';
import * as ReactDOM from 'react-dom';
import { matchMedia } from '@shopify/jest-dom-mocks';
import { Simple as TextFieldSimple } from '../stories/TextField.stories';

beforeEach(() => {
  matchMedia.mock();
});

afterEach(() => {
  matchMedia.restore();
});

describe('<TextField>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TextFieldSimple name="value" label="Text field" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
