import {Action, handleActions} from 'redux-actions';

import {IState, Todo} from '../models/todo';
import {ADD_TODO, COMPLETE_TODO, DELETE_TODO, EDIT_TODO, FETCH_DATA_SUCCESS_TODO} from '../constants/todo';

const initialState: IState = {
    todos: [{
        label: 'Use Redux with TypeScript',
        // completed: false,
        id: 0
    }],
    isLoading: false,
    hasError: false
};

export default handleActions<IState, Todo>({
    [ADD_TODO]: (state: IState, action: Action<Todo>): IState => {
        return {
            todos: [{
                id: state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                label: action.payload.text,
                // completed: action.payload.completed,
            }, ...state.todos],
            isLoading: state.isLoading,
            hasError: state.hasError
        }
    },

    [DELETE_TODO]: (state: IState, action: Action<Todo>): IState => {
        return {
            todos: state.todos.filter(todo => todo.id !== action.payload.id),
            isLoading: state.isLoading,
            hasError: state.hasError
        };
    },

    [EDIT_TODO]: (state: IState, action: Action<Todo>): IState => {
        return {
            todos: state.todos.map(todo => todo.id === action.payload.id ?
                { ...todo, label: action.payload.text} : todo),
            isLoading: state.isLoading,
            hasError: state.hasError
        }
    },

    [COMPLETE_TODO]: (state: IState, action: Action<Todo>): IState => {
        return state.map(todo =>
            todo.id === action.payload.id ? {...todo, completed: !todo.completed} : todo
        );
    },

    [FETCH_DATA_SUCCESS_TODO]: (state: IState, action: Action<Todo[]>): IState => {
        return action.payload.items
    }
}, initialState);