import { createNavigationReducer } from 'react-navigation-redux-helpers';
import AppNavigator from '../src/app-nagivator';

const navigationReducer = createNavigationReducer(AppNavigator)
export default navigationReducer;