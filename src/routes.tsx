import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import ClientsList from './pages/ClientsList';
import ClientForm from './pages/ClientForm';

function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Landing}/>
            <Route path="/study" exact component={ClientsList}/>
            <Route path="/give-classes" exact component={ClientForm}/>
        </BrowserRouter>
    )
}

export default Routes

