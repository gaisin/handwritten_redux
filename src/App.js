// TODO:
// Upload to a github repository
// Build it for online preview and upload on githib


import React from 'react';

function createStore(reducer, initialState) {
    let state = initialState;
    const listeners = [];

    const subscribe = (listener) => (
        listeners.push(listener)
    );

    const getState = () => (state);

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(l => l());
    };

    return {
        subscribe,
        getState,
        dispatch,
    };
}


function reducer(state, action) {
    if (action.type === 'ADD_MESSAGE') {
        return {
            messages: state.messages.concat(action.message),
        };
    } else if (action.type === 'DELETE_MESSAGE') {
        return {
            messages: [
                ...state.messages.slice(0, action.index), 
                ...state.messages.slice(
                    action.index + 1, state.messages.length
                ),
            ],
        };
    } else {
        return state;
    }
}


const initialState = { messages: [] };
const store = createStore(reducer, initialState);


class App extends React.Component {
    componentDidMount() {
        store.subscribe(() => this.forceUpdate());
    }

    render () {
        const messages = store.getState().messages;

        return (
            <div className='ui segment'>
                <MessageView
                    messages={messages}
                />
                <MessageInput />
            </div>
        )
    }
}

class MessageInput extends React.Component {
    state = {
        value: '',
    };

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        })
    };

    handleSubmit = () => {
        store.dispatch({
            type: 'ADD_MESSAGE',
            message: this.state.value
        });
        this.setState({
            value: '',
        })
    };

    render () {
        return (
            <div className='ui input'>
                <input 
                    value={this.state.value}
                    onChange={this.onChange}
                    type='text'
                />
                <button
                    onClick={this.handleSubmit}
                    className='ui button'
                    type='submit'
                >
                    Submit
                </button>
            </div>
        )
    }
}

class MessageView extends React.Component {
    handleCLick = (index) => {
        store.dispatch({
            type: 'DELETE_MESSAGE',
            index: index
        });
    };

    render() {
        const messages = this.props.messages.map((message, index) => (
            <div
                className='comment'
                key={index}
                onClick={() => this.handleCLick(index)}
            >
                {message}
            </div>
        ));

        return(
            <div className='ui comments'>
                {messages}
            </div>
        )
    }
}

export default App;
























