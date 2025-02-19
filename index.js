import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {firebaseApp} from './firebaseConfig';

AppRegistry.registerComponent(appName, () => App);
