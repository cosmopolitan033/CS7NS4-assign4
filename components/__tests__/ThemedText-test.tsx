import React from 'react';
// @ts-ignore
import { render } from '@testing-library/react-native';
import ThemedText from '../ThemedText';

test('renders ThemedText correctly', () => {
    const { getByText } = render(<ThemedText lightColor="#fff">Hello World</ThemedText>);
    expect(getByText('Hello World')).toBeTruthy();
});
