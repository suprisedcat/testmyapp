import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TodoScreen from '../../screens/TodoScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// TODO #3: Write integration tests for complete add todo workflow
//
// Your task: Write 5 integration tests that test complete user workflows
//
// Integration Test 1: Complete add todo workflow
//   - Hint: Clear AsyncStorage mocks in beforeEach()
//   - Hint: Render <TodoScreen />
//   - Hint: Type in input, press add button
//   - Hint: Use waitFor() to wait for async updates
//   - Hint: Verify todo appears in list
//   - Hint: Verify input was cleared
//   - Hint: Verify AsyncStorage.setItem was called
//
// Integration Test 2: Toggle and delete workflow
//   - Hint: Add a todo first
//   - Hint: Toggle it (check for strike-through style)
//   - Hint: Delete it (verify it disappears from list)
//   - Hint: Use queryByText() which returns null if not found
//
// Integration Test 3: Load from storage on mount
//   - Hint: Mock AsyncStorage.getItem to return saved todos
//   - Hint: Render TodoScreen
//   - Hint: Use waitFor() to wait for todos to load
//   - Hint: Verify todos appear in the list
//
// Integration Test 4: Persists to storage after changes
//   - Hint: Add a new todo
//   - Hint: Wait for update
//   - Hint: Verify AsyncStorage.setItem was called with correct data
//   - Hint: Check that the stringified data contains your todo text
//
// Integration Test 5: Handles storage errors gracefully
//   - Hint: Mock AsyncStorage.getItem to reject with an error
//   - Hint: Verify app still renders without crashing
//   - Hint: Check that input field is still available
//
// Example test structure:
describe('Add Todo Integration', () => {
  beforeEach(() => {
    // Clear mocks before each test
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
    AsyncStorage.getItem.mockResolvedValue(null);
  });

  // Integration Test 1: completes full add todo workflow
  it('completes full add todo workflow', async () => {
    const { getByPlaceholderText, getByText } = render(<TodoScreen />);
    const input = getByPlaceholderText('Add new todo');
    const addButton = getByText('Add');

    fireEvent.changeText(input, 'Buy groceries');
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(getByText('Buy groceries')).toBeTruthy();
      expect(input.props.value).toBe('');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'todos',
        expect.stringContaining('Buy groceries')
      );
    });
  });

  // Integration Test 2: completes toggle and delete workflow
  it('completes toggle and delete workflow', async () => {
    const { getByPlaceholderText, getByText, getByTestId, queryByText } = render(
      <TodoScreen />
    );
    const input = getByPlaceholderText('Add new todo');
    const addButton = getByText('Add');

    fireEvent.changeText(input, 'Walk the dog');
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(getByText('Walk the dog')).toBeTruthy();
    });

    // Toggle the todo
    const checkbox = getByTestId('todo-checkbox');
    fireEvent.press(checkbox);

    await waitFor(() => {
      const todoText = getByText('Walk the dog');
      expect(todoText).toHaveStyle({ textDecorationLine: 'line-through' });
    });

    // Delete the todo
    const deleteButton = getByTestId('delete-button');
    fireEvent.press(deleteButton);

    await waitFor(() => {
      expect(queryByText('Walk the dog')).toBeNull();
    });
  });

  // Integration Test 3: loads todos from storage on mount
  it('loads todos from storage on mount', async () => {
    const savedTodos = [
      { id: '1', text: 'Saved task 1', completed: false },
      { id: '2', text: 'Saved task 2', completed: true },
    ];
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(savedTodos));

    const { getByText } = render(<TodoScreen />);

    await waitFor(() => {
      expect(getByText('Saved task 1')).toBeTruthy();
      expect(getByText('Saved task 2')).toBeTruthy();
    });
  });

  // Integration Test 4: persists todos to storage after changes
  it('persists todos to storage after changes', async () => {
    const { getByPlaceholderText, getByText } = render(<TodoScreen />);
    const input = getByPlaceholderText('Add new todo');
    const addButton = getByText('Add');

    fireEvent.changeText(input, 'Read a book');
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalled();
      const lastCall =
        AsyncStorage.setItem.mock.calls[AsyncStorage.setItem.mock.calls.length - 1];
      expect(lastCall[0]).toBe('todos');
      expect(lastCall[1]).toContain('Read a book');
    });
  });

  // Integration Test 5: handles storage errors gracefully
  it('handles storage errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    AsyncStorage.getItem.mockRejectedValueOnce(new Error('Storage failure'));

    const { getByPlaceholderText, getByText } = render(<TodoScreen />);

    await waitFor(() => {
      expect(getByPlaceholderText('Add new todo')).toBeTruthy();
      expect(getByText('My Todo List')).toBeTruthy();
    });

    consoleSpy.mockRestore();
  });
});
