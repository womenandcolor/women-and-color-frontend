import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { MainContainer } from 'containers';

function Home() { return <div>Home</div>; }
function Authenticate() { return <div>Auth</div>; }
function Page() { return <div>Page</div>; }
function Register() { return <div>Register</div>; }
function Profile() { return <div>Profile</div>; }
function Work() { return <div>Work</div>; }
function Social() { return <div>Social</div>; }
function Speaker() { return <div>Speaker</div>; }

export default function Routes () {
    return (
        <Router>
            <MainContainer>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/auth" component={Authenticate}/>
                    <Route path="/about" component={Page}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/work" component={Work}/>
                    <Route path="/social" component={Social}/>
                    <Route path="/speaker" component={Speaker}/>
                </Switch>
            </MainContainer>
        </Router>
    )
};