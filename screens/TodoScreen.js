import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoItem from '../components/TodoItem';
import AddForm from '../components/AddForm';

export default function TodoScreen() {
  const [todos, setTodos] = useState([]);

  // Load todos from AsyncStorage on mount
  useEffect(() => {
    loadTodos();
  }, []);

  // Save todos to AsyncStorage whenever they change
  useEffect(() => {
    if (todos.length > 0) {
      saveTodos();
    }
  }, [todos]);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Failed to load todos:', error);
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos:', error);
    }
  };

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now().toString(),
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo List</Text>
      <AddForm onSubmit={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No todos yet. Add one above!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 16,
  },
});
