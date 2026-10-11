import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID="todo-checkbox"
        onPress={() => onToggle(todo.id)}
        style={styles.checkbox}
      >
        <View style={[styles.checkboxInner, todo.completed && styles.checked]}>
          {todo.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <Text style={[styles.text, todo.completed && styles.completedText]}>
        {todo.text}
      </Text>

      <TouchableOpacity
        testID="delete-button"
        onPress={() => onDelete(todo.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    padding: 5,
  },
  deleteText: {
    fontSize: 20,
    color: '#FF3B30',
  },
});
