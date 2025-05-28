// Importing required modules and components
import { render, screen } from '@testing-library/react';
import App from './App';


test('renders learn react link', () => {
  // Render the App component
  render(<App />);
  // Query the rendered output for a text element with the content 'learn react'
  const linkElement = screen.getByText(/learn react/i);
  // Expect the queried element to be present in the document
  expect(linkElement).toBeInTheDocument();
});
