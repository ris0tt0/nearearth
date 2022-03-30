import React from 'react';
import { render, screen } from '@testing-library/react'; // (or /dom, /vue, ...)
import GridItem from './GridItem';

test('should show login form', () => {
  render(<GridItem label="high" />);
  //   const input = screen.getByLabelText('Username')
  // Events and assertions...
});
