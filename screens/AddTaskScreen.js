import React,{Component}from 'react';
import moment from 'moment';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';

import{SingleDatePicker} from 'react-dates';
import db from '../config';
import firebase from 'firebase';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';


export default class AddTaskScreen extends Component {
    constructor(){
        super ();
        this.state={
            userId:firebase.auth().currentUser.email,
            task:"",
            reminder:"",
            createdAt:moment(),
            focused:false 

        }
    }
    createUniqueId(){
        return Math.random().toString(36).substring(7);
      }
    
    addTask=async(task)=>{
        var dt=this.state.createdAt.toString();
        var dt1=dt.slice(0,15)
        var randomRequestId = this.createUniqueId()
        db.collection("task_list").add({
            "user_id":this.state.userId,
            "task":task,
            "request_id"  : randomRequestId,
            "date"       : dt1,
            "status":"incomplete",
          
        })
        console.log(dt1)
       
    }
    componentDidMount(){
        var dt=this.state.createdAt.toString();
        var dt1=dt.slice(0,15)
        console.log(dt1)
    }
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Add Task</Text>
                <TextInput
                style={styles.formTextInput}
                placeholder="Enter Task"
                onChangeText={(text)=>{
                    this.setState({task:text})
                }}
                value={this.state.task}
                ></TextInput>
             {/* <TextInput
                placeholder="Set time and date for reminder"
                onChangeText={(text)=>{
                    this.setState({reminder:text})
                }}
                value={this.state.reminder}
            ></TextInput>*/}
            
            <SingleDatePicker
  date={this.state.createdAt} 
  onDateChange={date => this.setState({ createdAt: date })} 
  focused={this.state.focused} 
  onFocusChange={({ focused }) => this.setState({ focused })} 
    
/>
                <TouchableOpacity
                style={styles.button}
                onPress={()=>{
                    this.addTask(this.state.task);
                   // this.setState({task:"",reminder:""})
                }}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#9340FF',
        alignItems: 'center',
        justifyContent: 'center'
      },
      formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#00004d',
        borderRadius:20,
        borderWidth:5,
        marginTop:20,
        marginBottom:20,
        padding:10
      },
      button:{
          marginTop:20,
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#0044bc",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10
      },
      buttonText:{
        color:'#ffff',
        fontWeight:'300',
        fontSize:25
      },
      title :{
        fontSize:45,
        fontWeight:'500',
        paddingBottom:30,
        color : '#00004d'
      },
})