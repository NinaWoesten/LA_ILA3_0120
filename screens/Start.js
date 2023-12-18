import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My To-Do List</Text>
      {todos.map((todo, index) => (
        <Text key={index} style={styles.todoText}>
          {todo}
        </Text>
      ))}

      <TextInput
        placeholder="Enter a to-do item"
        value={newTodo}
        onChangeText={(text) => setNewTodo(text)}
        style={styles.input}
      />
      <Button
        title="Add"
        onPress={handleAddTodo}
        color="hotpink" 
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, 
  },
  todoText: {
    marginBottom: 10, 
  },
  input: {
    marginBottom: 10, 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    width: '100%',
  },
});