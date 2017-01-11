import React from 'react';
import { Route,IndexRoute } from 'react-router';


import App from './components/app';
import CodeEdit  from './components/codeedit'
import CodeView  from './components/codeview'

import io from 'socket.io-client';
const socket = io('', { path: '/api/codeeditor' });

export default (
    <Route path="/" component={App} >
        <IndexRoute component={CodeView} />
        <Route path="/edit" component={CodeEdit}/>
        <Route path="/view" component={CodeView}/>
    </Route>
)