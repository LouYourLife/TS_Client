import React from "react";
import "../App.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import AddFriend from "./AddFriend";
import AllFriends from "./AllFriends"
import FindFriend from "./FindFriend"
import Home from "./Home"
import ChangeFriend from "./ChangeFriend"
import RemoveFriend from "./RemoveFriend"

const URI = "http://localhost:5555/graphql"

const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache()
})

export default function App() {
  return (
    <Router>
      <div>
        <ul className="header">
          <li>
            <NavLink exact activeClassName="selected" to="/">Home</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/allFriends">All Friends</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/findFriend">Find Friend</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/addFriend">Add Friend</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/editFriend">Edit Friend</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/deleteFriend">Delete Friend</NavLink>
          </li>
        </ul>

        <hr />
        <ApolloProvider client={client}>
        {/* Alt har adgang til clienten inde i apolloprovider, queries kan laves herinde, bruger den givne client */}
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/allFriends">
              <AllFriends />
            </Route>
            <Route path="/findFriend">
              <FindFriend />
            </Route>
            <Route path="/addFriend">
              <AddFriend />
            </Route>
            <Route path="/editFriend">
              <ChangeFriend/>
            </Route>
            <Route path="/deleteFriend">
              <RemoveFriend/>
            </Route>

          </Switch>
        </div>
        </ApolloProvider>
      </div>
    </Router>
  );
}
