import { describe, it, expect } from 'vitest';
import { add, repeat, capitalize } from './index';

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('handles negative numbers', () => {
    expect(add(-1, 1)).toBe(0);
  });
});

describe('repeat', () => {
  it('repeats a string n times', () => {
    expect(repeat('a', 3)).toBe('aaa');
  });

  it('returns empty string for n = 0', () => {
    expect(repeat('a', 0)).toBe('');
  });

  it('handles n < 0 as 0', () => {
    expect(repeat('a', -1)).toBe('');
  });
});

describe('capitalize', () => {
  it('capitalizes the first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('handles an empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('leaves already capitalized strings unchanged', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });
});
