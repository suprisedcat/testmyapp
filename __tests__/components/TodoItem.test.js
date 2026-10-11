import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TodoItem from '../../components/TodoItem';

// TODO #1: Write component tests for TodoItem
//
// Your task: Write 5 tests to verify TodoItem component behavior
//
// Test 1: Renders todo text correctly
//   - Hint: Use getByText() to find the todo text
//   - Hint: Use expect().toBeTruthy() to verify it exists
//
// Test 2: Calls onToggle when checkbox pressed
//   - Hint: Create a mock function with jest.fn()
//   - Hint: Use getByTestId('todo-checkbox') to find the checkbox
//   - Hint: Use fireEvent.press() to simulate a press
//   - Hint: Use expect(mock).toHaveBeenCalledWith() to verify
//
// Test 3: Calls onDelete when delete button pressed
//   - Hint: Similar to Test 2, but use 'delete-button' testID
//
// Test 4: Applies strike-through style when completed
//   - Hint: Create a todo with completed: true
//   - Hint: Check textElement.props.style for textDecorationLine
//
// Test 5: Handles empty text gracefully
//   - Hint: Create a todo with text: ''
//   - Hint: Verify component renders without crashing
//
// Example test structure:
describe('TodoItem Component', () => {
  const mockTodo = {
    id: '1',
    text: 'Test todo item',
    completed: false,
  };

  // Test 1: renders todo text correctly
  it('renders todo text correctly', () => {
    const { getByText } = render(
      <TodoItem todo={mockTodo} onToggle={() => {}} onDelete={() => {}} />
    );
    expect(getByText('Test todo item')).toBeTruthy();
  });

  // Test 2: calls onToggle when checkbox pressed
  it('calls onToggle when checkbox pressed', () => {
    const mockToggle = jest.fn();
    const { getByTestId } = render(
      <TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={() => {}} />
    );
    fireEvent.press(getByTestId('todo-checkbox'));
    expect(mockToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  // Test 3: calls onDelete when delete button pressed
  it('calls onDelete when delete button pressed', () => {
    const mockDelete = jest.fn();
    const { getByTestId } = render(
      <TodoItem todo={mockTodo} onToggle={() => {}} onDelete={mockDelete} />
    );
    fireEvent.press(getByTestId('delete-button'));
    expect(mockDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  // Test 4: applies strike-through style when completed
  it('applies strike-through style when completed', () => {
    const completedTodo = { ...mockTodo, completed: true };
    const { getByText } = render(
      <TodoItem todo={completedTodo} onToggle={() => {}} onDelete={() => {}} />
    );
    const textElement = getByText('Test todo item');
    expect(textElement).toHaveStyle({ textDecorationLine: 'line-through' });
  });

  // Test 5: handles empty text gracefully
  it('handles empty text gracefully', () => {
    const emptyTodo = { ...mockTodo, text: '' };
    const { getByTestId } = render(
      <TodoItem todo={emptyTodo} onToggle={() => {}} onDelete={() => {}} />
    );
    expect(getByTestId('todo-checkbox')).toBeTruthy();
  });
});
