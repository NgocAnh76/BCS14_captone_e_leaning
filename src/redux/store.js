import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducer/reducer"; // Adjust the path if necessary

// Setup Redux DevTools Extension with a fallback to 'compose' for production
const composeEnhancers =
    (
        import.meta.env.MODE === "development" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

// Create Redux Store
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;