import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, Keyboard, ScrollView, TouchableWithoutFeedback, SafeAreaView, Image} from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { collection, getDoc, addDoc, deleteDoc, doc, onSnapshot, updateDoc, getFirestore } from 'firebase/firestore';
const firestore = getFirestore();
const todoRef = collection(firestore, 'todos');

const Home = () => {
  const auth = FIREBASE_AUTH;
  const firestore = FIREBASE_DB;
  const navigation = useNavigation();
  const [addData, setAddData] = useState('');
  const [addDetails, setAddDetails] = useState('');
  const [changeTitle, setChangeTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const todoRef = collection(firestore, 'todos');


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(todoRef, (querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        const { heading, details, category, status } = doc.data();
        todos.push({ id: doc.id, heading, details, category, status });
      });
      setTodos(todos);
    });

    return () => unsubscribe();
  }, [firestore]);

  const handleAddTodo = async () => {
    if (addData && addData.trim().length > 0) { 
      const data = {
        heading: addData,
        details: '',
        category: '',
        status: 'Todo',
      };
  
      try {
        const todoRef = collection(firestore, 'todos');
        await addDoc(todoRef, data);
        setAddData('');
      } catch (error) {
        console.error('Error adding todo: ', error);
      }
    }
  };
  
  const handleTextPress = (todo) => {
    setSelectedTodo(todo);
    setChangeTitle(todo.heading);
    setAddDetails(todo.details);
    setModalVisible(true); 
  };

  const handleDetailsClosed = () => {
    setModalVisible(false);
    setSelectedTodo(null); 
  };

  const handleChangeTitle = () => {
    if (selectedTodo && selectedTodo.id && changeTitle && changeTitle.length > 0) {
      const todoDocRef = doc(firestore, 'todos', selectedTodo.id);
      updateDoc(todoDocRef, {
        heading: changeTitle,
      })
        .then(() => {
          setChangeTitle('');
          Keyboard.dismiss();
        })
        .catch((error) => {
          console.error('Error updating title: ', error);
        });
    }
  };

  const handleAddDetails = () => {
    if (addDetails && addDetails.length > 0 && selectedTodo?.id) {
      const todoDocRef = doc(todoRef, selectedTodo.id);
      updateDoc(todoDocRef, {
        details: addDetails,
      })
        .then(() => {
          setAddDetails('');
          Keyboard.dismiss();
        })
        .catch((error) => {
          console.error('Error updating details: ', error);
        });
    }
  };
  const handleSchool = async () => {
    if (selectedTodo && selectedTodo.id) {
      try {
        const todoDocRef = doc(firestore, 'todos', selectedTodo.id);
        const docSnapshot = await getDoc(todoDocRef);
        const todoData = docSnapshot.data();
  
        if (todoData.category !== 'School') {
          await updateDoc(todoDocRef, { category: 'School' });
          console.log('Category updated to School');
        } else {
          await updateDoc(todoDocRef, { category: '' });
          console.log('Category updated to None');
        }
      } catch (error) {
        console.error('Error updating category: ', error);
      }
    }
  };
  
  const handleWork = async () => {
    if (selectedTodo && selectedTodo.id) {
      try {
        const todoDocRef = doc(firestore, 'todos', selectedTodo.id);
        const docSnapshot = await getDoc(todoDocRef);
        const todoData = docSnapshot.data();
  
        if (todoData.category !== 'Work') {
          await updateDoc(todoDocRef, { category: 'Work' });
          console.log('Category updated to Work');
        } else {
          await updateDoc(todoDocRef, { category: '' });
          console.log('Category updated to None');
        }
      } catch (error) {
        console.error('Error updating category: ', error);
      }
    }
  };
  
  const handleMisc = async () => {
    if (selectedTodo && selectedTodo.id) {
      try {
        const todoDocRef = doc(firestore, 'todos', selectedTodo.id);
        const docSnapshot = await getDoc(todoDocRef);
        const todoData = docSnapshot.data();
  
        if (todoData.category !== 'Misc') {
          await updateDoc(todoDocRef, { category: 'Misc' });
          console.log('Category updated to Misc');
        } else {
          await updateDoc(todoDocRef, { category: '' });
          console.log('Category updated to None');
        }
      } catch (error) {
        console.error('Error updating category: ', error);
      }
    }
  };
  
  const handleChore = async () => {
    if (selectedTodo && selectedTodo.id) {
      try {
        const todoDocRef = doc(firestore, 'todos', selectedTodo.id);
        const docSnapshot = await getDoc(todoDocRef);
        const todoData = docSnapshot.data();
  
        if (todoData.category !== 'Chore') {
          await updateDoc(todoDocRef, { category: 'Chore' });
          console.log('Category updated to Chore');
        } else {
          await updateDoc(todoDocRef, { category: '' });
          console.log('Category updated to None');
        }
      } catch (error) {
        console.error('Error updating category: ', error);
      }
    }
  };
  
  const handleDone = async () => {
    setModalVisible(false);
    if (selectedTodo && selectedTodo.id && selectedTodo.status !== undefined) {
      try {
        const todoDocRef = doc(firestore, 'todos', selectedTodo.id);
        const newStatus = selectedTodo.status !== 'Done' ? 'Done' : 'Todo';
  
        await updateDoc(todoDocRef, { status: newStatus });
  
        if (newStatus === 'Done') {
          alert('🎉 You did it! 🥳');
        }
      } catch (error) {
        if (selectedTodo.status !== 'Done') {
          console.error('Error updating status to Done: ', error);
        } else {
          console.error('Error updating status to Todo: ', error);
        }
      }
    } else {
      console.error('Selected todo or status not available.');
    }
  };
  
  

  const getColorForCategory = (category) => {
    switch (category) {
      case 'School':
        return '#E08DAC'; 
      case 'Work':
        return '#6A7FDB'; 
      case 'Misc':
        return '#57E2E5'; 
      case 'Chore':
        return '#60D297'; 
      default:
        return '#E08DAC'; 
    }
  };

  const checkStatus = (status) => {
    if (status === 'Done'){
      return { textDecorationLine: 'line-through' };
    }
    else if (status === 'Todo'){
      return { textDecorationLine: 'none' };
    }
  };


  const handleDeleteToDo = () => {
    if (selectedTodo && selectedTodo.id) {
      const todoDocRef = doc(firestore, 'todos', selectedTodo.id);
      deleteDoc(todoDocRef)
        .then(() => {
          alert('Your To-Do has been deleted.');
          setModalVisible(false);
          setSelectedTodo(null);
        })
        .catch((error) => {
          console.error('Error deleting to-do: ', error);
        });
    }
  };
  
 



  return (
    <View style={styles.container}>
        <Text style={styles.title}>My To-Do List</Text>

      <TextInput
        placeholder="Enter a to-do"
        value={addData}
        onChangeText={(heading) => setAddData(heading)}
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          title="Add"
          onPress={handleAddTodo}
          style={styles.addButton}
          color= 'default'>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Add</Text> 
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
          {todos.map((todo, index) => (
            <View key={index} style={styles.ListContainer}>
              <TouchableOpacity onPress={() => handleTextPress(todo)}>
              <Text style={[styles.ListText, {color: getColorForCategory(todo.category)}, checkStatus(todo.status)]}>
                 • {todo.heading}</Text>
              </TouchableOpacity>
            </View>
        ))}
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={handleSignOut} style={styles.addButton}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>Sign Out</Text> 
      </TouchableOpacity></View>
      </View>
      
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
      >
        <KeyboardAvoidingView style={styles.detailContainer}>

          <Text style={styles.detailsTitle}>To-Do Details</Text>

          <TextInput
            placeholder="Enter a new title"
            value={changeTitle}
            onChangeText={(text) => setChangeTitle(text)}
            style={styles.inputtitle}
          />

          <TextInput
            placeholder="Enter details"
            value={addDetails}
            onChangeText={(details) => setAddDetails(details)}
            style={styles.inputDetails}
            multiline={true}
          />

          <View style={styles.catergoryContainer}>
            <View style={styles.SchoolContainer}>
              <TouchableOpacity 
                title="School" 
                style={styles.addButton}
                onPress= {handleSchool}>
               <Text style={{ color: 'white', fontWeight: 'bold' }}>School</Text> 
            </TouchableOpacity>
            </View>
            <View style={styles.WorkContainer}>
              <TouchableOpacity 
                title="Work" 
                style={styles.addButton} 
                onPress={handleWork}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Work</Text> 
                </TouchableOpacity>
            </View>
          </View>

          <View style={styles.catergoryContainer}>
            <View style={styles.choreContainer}>
              <TouchableOpacity  
                title="Chore" 
                style={styles.addButton}
                onPress={handleChore}
                color= 'gray'>
               <Text style={{ color: 'white', fontWeight: 'bold' }}>Chore</Text> 
                </TouchableOpacity>
            </View>
            <View style={styles.miscContainer}>
              <TouchableOpacity 
                title="Misc" 
                style={styles.addButton} 
                onPress={handleMisc}
                color= 'gray'>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Misc</Text> 
                </TouchableOpacity>
            </View>
          </View>

          <View style={styles.restContainer}>
            <View style={styles.checkContainer}>
              <TouchableOpacity 
                title="✔" 
                style={styles.addButton}
                onPress={handleDone}
                color= 'gray'>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>✔</Text> 
                </TouchableOpacity>
            </View>
            <View style={styles.delContainer}>
              <TouchableOpacity 
                title="✘" 
                style={styles.addButton} 
                color= 'gray'
                onPress= {handleDeleteToDo}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>✘</Text> 
            </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonContainer}>

            <TouchableOpacity 
              title="Save" 
              onPress={() => {
                handleDetailsClosed();
                handleChangeTitle();
                handleAddDetails();
              }}
              style={[styles.addButton, { backgroundColor: '#E59FB8' }]}>
              <Text style={{ color: 'white', fontWeight:'bold' }}>Save</Text> 
          </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, 
    color: '#E59FB8',
    textDecorationLine: 'underline',
    textDecorationStyle:'dotted'
  },
  input: {
    borderColor: 'lightgray', 
    borderWidth: 1, 
    borderRadius: 30, 
    paddingHorizontal: 10, 
    color: 'gray',
    fontSize: 20,
    height: 40,
    width: '70%'
  },
  buttonContainer: {
    borderColor: 'lightgray', 
    borderWidth: 1, 
    borderRadius: 10, 
    paddingHorizontal: 10, 
    marginTop: 30,
    backgroundColor:'#E59FB8'
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center', 
    justifyContent: 'center',  
  },
  ListContainer:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  ListText:{
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5, 
  },
  detailContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  detailsTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40, 
    marginBottom: 20, 
    color: "#E59FB8",
    textDecorationLine: 'underline',
    textDecorationStyle:'dotted'
  },
  backButton:{
    fontWeight: 'bold',
    fontSize: 18,
  },
  inputtitle: {
    borderColor: 'lightgray', 
    borderWidth: 1, 
    borderRadius: 10, 
    paddingHorizontal: 10, 
    color: '#153131',
    fontSize: 20,
    height: 40,
    width: '80%',
  },
  inputDetails: {
    borderColor: 'lightgray', 
    borderWidth: 1, 
    borderRadius: 10, 
    paddingHorizontal: 10, 
    color: '#153131',
    fontSize: 19,
    height: 200,
    width: '80%',
    marginTop: 10,
  },
  catergoryContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '80%',
    marginTop: 10
  },
  WorkContainer:{
    borderColor: 'lightgray', 
    borderWidth: 2, 
    borderRadius: 10, 
    paddingHorizontal: 10, 
    marginTop: 10,
    backgroundColor: '#6A7FDB',
    width: '40%'
  },
  SchoolContainer:{
    backgroundColor: '#E59FB8',
    borderColor: 'lightgray', 
    borderWidth: 2, 
    borderRadius: 10, 
    paddingHorizontal: 10, 
    marginTop: 10,
    width: '40%'
  },

  choreContainer:{
    borderColor: 'lightgray', 
    borderWidth: 2, 
    borderRadius: 10, 
    paddingHorizontal: 10, 
    marginTop: 10,
    backgroundColor: '#60D297',
    width: '40%'
  },
  miscContainer:{
    backgroundColor: '#57E2E5',
    borderColor: 'lightgray', 
    borderWidth: 2, 
    borderRadius: 10, 
    paddingHorizontal: 10, 
    marginTop: 10,
    width: '40%'
  },
  restContainer:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '40%',
    marginTop: 10
  },
  checkContainer:{
    borderColor: 'lightgray', 
    borderWidth: 2, 
    borderRadius: 17, 
    paddingHorizontal: 10, 
    marginTop: 10,
    backgroundColor: '#60D297',
  },
  delContainer:{
    borderColor: 'lightgray', 
    borderWidth: 2, 
    borderRadius: 17, 
    paddingHorizontal: 10, 
    marginTop: 10,
    backgroundColor: '#E59FB8',
  },
  
});
export default Home;