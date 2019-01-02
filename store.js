import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import reducer from './reducers/index';
import storage from 'redux-persist/lib/storage';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';


// const store = createStore(reducer, {
//     allPlanes: [],
// })

const persistConfig = {
    key: 'root',
    storage, 
    blacklist: ['navigation']
}

const persistedReducer = persistReducer(persistConfig, reducer)

const navigationMiddlaware = createReactNavigationReduxMiddleware(
    'root',
    state => state.navigation
)

const store = createStore(
    persistedReducer,
    applyMiddleware(navigationMiddlaware)
);
const persistor = persistStore(store);


export { store, persistor };