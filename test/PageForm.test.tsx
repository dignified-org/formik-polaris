import React from 'react';
import * as ReactDOM from 'react-dom';
import { matchMedia } from '@shopify/jest-dom-mocks';
import { ExistingResource as PageFormExistingResource } from '../stories/PageForm.stories';

beforeEach(() => {
  matchMedia.mock();
});

afterEach(() => {
  matchMedia.restore();
});

describe('<PageForm>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PageFormExistingResource {...{} as any} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});