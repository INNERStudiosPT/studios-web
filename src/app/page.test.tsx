import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Home from './page';

// Mock GSAP to prevent issues with window/animations during testing
vi.mock('gsap', () => ({
  default: {
    timeline: () => ({
      fromTo: function() { return this; }
    }),
    context: (cb: () => void) => {
      cb();
      return { revert: () => {} };
    },
    utils: {
      toArray: () => []
    }
  }
}));

describe('Home Landing Page', () => {
  it('renders the branding title logo', () => {
    render(<Home />);
    const heading = screen.getAllByAltText('inner studios')[0];
    expect(heading).toBeInTheDocument();
  });
});
