import React from 'react';
import {Route} from 'react-router-dom';
import Posts from './posts';
import Home from './Home';
import Contact from './contact'


function Content(){
    return(
        <div>
            <Route path="/" exact component={Home}></Route>
            <Route path="/posts" exact component={Posts}></Route>
            <Route path="/contact" exact component={Contact}></Route>
        </div>
    );
}

export default Content;