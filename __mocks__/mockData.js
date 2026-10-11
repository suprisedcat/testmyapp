// Mock data for testing
export const mockTodos = [
  {
    id: '1',
    text: 'Complete Activity 19',
    completed: false,
  },
  {
    id: '2',
    text: 'Write component tests',
    completed: true,
  },
  {
    id: '3',
    text: 'Write integration tests',
    completed: false,
  },
];

export const createMockTodo = (overrides = {}) => ({
  id: Date.now().toString(),
  text: 'Mock todo item',
  completed: false,
  ...overrides,
});
