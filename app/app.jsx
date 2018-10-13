import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
    render() {
        return 'Hello World';
    }
}

render(
    React.createElement(App),
    document.getElementById('app')
);
