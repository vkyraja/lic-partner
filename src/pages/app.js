import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserForm from './userForm';

const App = () => {
    return (
        <div className='lic-partner-container container mx-auto'>
            <header>
                <h1>User Map Data</h1>
            </header>
            <section className='lic-partner-content'>
                <Switch>
                    <Route exact path='/user-form' component={UserForm} />
                </Switch>
            </section>
        </div>
    );
}

export default App;
