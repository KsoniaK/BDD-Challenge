import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';


function Navigation() {
    return (
        <ul>
            <li><button><Link to='/home'>Home</Link></button></li>
            <li><button><Link to='/series'>Les Séries</Link></button></li>
            <li><button><Link to='/films'>Les Films</Link></button></li>
        </ul>
    )
}
export default Navigation;