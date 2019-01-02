import React, { Component } from 'react';
import {BackHandler, AsyncStorage, Alert} from 'react-native';
import { connect } from 'react-redux';
import AppNavigator from './app-nagivator';
import { reduxifyNavigator } from 'react-navigation-redux-helpers';
import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';

const ReduxifyApp = reduxifyNavigator(AppNavigator, 'root');

class AppNavigatorWithState extends ReduxifyApp {

  constructor(props){
    super(props);
    this.devices = firebase.firestore().collection('devices');   
    this.unsubscribe = null; 
  }

  onNavigation = () => {
    this.props.dispatch(
        NavigationActions.navigate({
            routeName: 'Loteria'
        })
    )
  }


  async componentDidMount(){  
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);  
    this.checkPermission();
    this.createNotificationListeners();  

    // firebase.notifications().android.createChannel(channel);
    // this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
    //     // Process your notification as required
    //     // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    //     this.showAlert(title, notification);
    // });
    
    this.messageListener = firebase.messaging().onMessage((message) => {
      // Process your message as required
      console.log(message);
  });



    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        // App was opened by a notification
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
       

        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
        // console.log("OYEE" + title + body)
    }

    firebase.notifications().getInitialNotification()
    .then((notificationOpen ) => {
      if (notificationOpen) {
        // App was opened by a notification
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
      }
    })
    .catch((e)=>{
      console.log('Nada');
    })

  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
  }
  
    //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken', fcmToken);
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            console.log(fcmToken);
            await AsyncStorage.setItem('fcmToken', fcmToken);   
            this.addTokenDB(fcmToken);     
        }
    }else{
      console.log(fcmToken);   
    }
  }

  addTokenDB(fcmToken) {
    this.devices.add({
      token: fcmToken
    });
  }
  
    //2
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        // this.showAlert(title, body);
    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = await firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        // this.showAlert(title, body);
        // console.log("OYEE")
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        // this.showAlert(title, body);
        // console.log("OYEE")
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log("La data");
      console.log(message);
    });
  }
  
  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
  










  backPressed = () => {
    BackHandler.exitApp();
  }

  componentWillUnmount() {
    // this.unsubscribe();
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed); 
    this.messageListener();   
    // this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }

}



function mapStateToProps(state) {
    return {
      state: state.navigation
    }
  }

export default connect(mapStateToProps) (AppNavigatorWithState);