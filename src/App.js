import React from 'react';
import { Route } from 'react-router-dom';
import { view as Loading } from './components/loading';
import { view as Login } from './login';
import { view as Home } from './pages';

const App = () => {
    return (
        <div>
            <Loading />
            <Route path="/" component={Login} exact />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
        </div>
    );
};

export default App;