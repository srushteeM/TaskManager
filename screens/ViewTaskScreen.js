import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";
import { ListItem } from "react-native-elements";

import db from "../config";
import firebase from "firebase";

export default class ViewTaskScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      taskList: [],
      docId: "",
    };
    this.requestRef = null;
  }
  markAsDone = (requestId) => {
    db.collection("task_list")
      .where("user_id", "==", this.state.userId)
      .where("request_id", "==", requestId)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          //updating the doc
          db.collection("task_list").doc(doc.id).update({
            status: "complete",
          });
        });
      });
  };

  getTaskList = () => {
    this.requestRef = db
      .collection("task_list")
      .where("user_id", "==", this.state.userId)
      .where("status", "==", "incomplete")
      .onSnapshot((snapshot) => {
        var taskList = snapshot.docs.map((doc) => doc.data());
        var docId = snapshot.docs.map((doc) => doc.id);
        console.log(this.state.docId);
        this.setState({
          taskList: taskList,
          docId: docId,
        });
      });
  };

  componentDidMount() {
    this.getTaskList();
  }

  componentWillUnmount() {
    this.requestRef();
  }
  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
      
    
        key={i}
        style={{backgroundColor: 'EE00FF'}}
        title={"Task:" + item.task}
        subtitle={"Deadline:" + item.date}
        titleStyle={{ color: "black",  fontWeight:'800',
        fontSize:28 }}
        subtitleStyle={{color: "black",  fontWeight:'300',
        fontSize:25}}
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log(item.request_id);
              this.markAsDone(item.request_id);
            }}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.taskList.length === 0 ? (
          <View style={styles.subContainer}>
            <Text style={{ fontSize: 20 }}>List Of All Tasks Pending</Text>
          </View>
        ) : (
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.taskList}
            renderItem={this.renderItem}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EE00FF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'300',
    fontSize:20
  },
});
