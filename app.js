import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [tasks, setTasks] = useState([]);

  // Add a new task
  const addTask = () => {
    const trimmedText = inputText.trim();

    if (trimmedText === '') {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      text: trimmedText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputText('');
  };

  // Mark a task as completed
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Display each task
  const renderTask = ({ item }) => (
    <View style={styles.taskRow}>
      <TouchableOpacity
        style={styles.taskContent}
        onPress={() => toggleTask(item.id)}
      >
        <View
          style={[
            styles.checkbox,
            item.completed && styles.checkboxCompleted,
          ]}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>

        <Text
          style={[
            styles.taskText,
            item.completed && styles.completedText,
          ]}
        >
          {item.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My To-Do List</Text>
      <Text style={styles.subtitle}>
        Add tasks and tap them when completed
      </Text>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task..."
          placeholderTextColor="#888"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={addTask}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addTask}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={
          tasks.length === 0 ? styles.emptyList : styles.list
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks yet.</Text>
            <Text style={styles.emptySubtext}>
              Add your first task above!
            </Text>
          </View>
        }
      />

      <Text style={styles.taskCount}>
        {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 15,
    color: '#666',
    marginTop: 5,
    marginBottom: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D5D9DD',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#222',
  },

  addButton: {
    height: 50,
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginLeft: 10,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  list: {
    paddingBottom: 20,
  },

  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyContainer: {
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#777',
  },

  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },

  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#2E7D32',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  checkboxCompleted: {
    backgroundColor: '#2E7D32',
  },

  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },

  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },

  deleteButton: {
    backgroundColor: '#E53935',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 10,
  },

  deleteText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },

  taskCount: {
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
    paddingVertical: 10,
  },
});
