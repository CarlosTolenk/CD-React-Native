import { combineReducers } from 'redux';
import navigation from './navigation';
import planes from './planes';

const reducer = combineReducers({
    planes,
    navigation,
})

export default  reducer;