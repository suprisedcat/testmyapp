import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddForm from '../../components/AddForm';

// TODO #2: Write component tests for AddForm
//
// Your task: Write 6 tests to verify AddForm component behavior
//
// Test 1: Renders input field and add button
//   - Hint: Use getByPlaceholderText('Add new todo')
//   - Hint: Use getByText('Add')
//   - Hint: Verify both exist with toBeTruthy()
//
// Test 2: Updates input value when typing
//   - Hint: Get the input with getByPlaceholderText()
//   - Hint: Use fireEvent.changeText(input, 'New test todo')
//   - Hint: Check input.props.value to verify the change
//
// Test 3: Calls onSubmit with text when add button pressed
//   - Hint: Create mock with jest.fn()
//   - Hint: Type text first, then press button
//   - Hint: Verify onSubmit was called with the typed text
//
// Test 4: Clears input after successful submission
//   - Hint: After pressing the add button, check if input.props.value is empty
//
// Test 5: Disables add button when input is empty
//   - Hint: Check button.props.disabled property
//   - Hint: It should be true when input is empty
//
// Test 6: Does not call onSubmit when text is empty
//   - Hint: Press add button without typing
//   - Hint: Use expect(mockSubmit).not.toHaveBeenCalled()
//
// Example test structure:
describe('AddForm Component', () => {
  // Test 1: renders input field and add button
  it('renders input field and add button', () => {
    const { getByPlaceholderText, getByText } = render(
      <AddForm onSubmit={() => {}} />
    );
    expect(getByPlaceholderText('Add new todo')).toBeTruthy();
    expect(getByText('Add')).toBeTruthy();
  });

  // Test 2: updates input value when typing
  it('updates input value when typing', () => {
    const { getByPlaceholderText } = render(
      <AddForm onSubmit={() => {}} />
    );
    const input = getByPlaceholderText('Add new todo');
    fireEvent.changeText(input, 'New test todo');
    expect(input.props.value).toBe('New test todo');
  });

  // Test 3: calls onSubmit with text when add button pressed
  it('calls onSubmit with text when add button pressed', () => {
    const mockSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <AddForm onSubmit={mockSubmit} />
    );
    const input = getByPlaceholderText('Add new todo');
    const button = getByText('Add');
    fireEvent.changeText(input, 'New test todo');
    fireEvent.press(button);
    expect(mockSubmit).toHaveBeenCalledWith('New test todo');
  });

  // Test 4: clears input after successful submission
  it('clears input after successful submission', () => {
    const { getByPlaceholderText, getByText } = render(
      <AddForm onSubmit={() => {}} />
    );
    const input = getByPlaceholderText('Add new todo');
    const button = getByText('Add');
    fireEvent.changeText(input, 'New test todo');
    fireEvent.press(button);
    expect(input.props.value).toBe('');
  });

  // Test 5: disables add button when input is empty
  it('disables add button when input is empty', () => {
    const { getByText } = render(
      <AddForm onSubmit={() => {}} />
    );
    const button = getByText('Add');
    expect(button).toBeDisabled();
  });

  // Test 6: does not call onSubmit when text is empty
  it('does not call onSubmit when text is empty', () => {
    const mockSubmit = jest.fn();
    const { getByText } = render(
      <AddForm onSubmit={mockSubmit} />
    );
    const button = getByText('Add');
    fireEvent.press(button);
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
