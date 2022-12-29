/**
 * @format
 */
import 'react-native-url-polyfill/auto';
import { AppRegistry, Platform } from 'react-native';
import App from './src';
import { name as appName } from './app.json';


AppRegistry.registerComponent(appName, () => App);