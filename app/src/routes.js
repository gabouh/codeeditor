import React from 'react';
import { Route,IndexRoute } from 'react-router';


import App from './components/app';
import CodeEdit  from './components/codeedit'
import CodeView  from './components/codeview'


export default (
    <Route path="/" component={App} >
        <Route path="/edit" component={CodeEdit}/>
        <Route path="/view" component={CodeView}/>
    </Route>
)