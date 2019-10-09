// import React from 'react';
// import styled, { keyframes } from 'styled-components';
// import logo from './img/logo.svg';
// import Counter from './Counter';

// const Spin = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `;

// const Container = styled.div`
//   text-align: center;
// `;

// const Header = styled.header`
//   background-color: #282c34;
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   font-size: calc(10px + 2vmin);
//   color: white;
// `;

// const Logo = styled.img`
//   animation: ${Spin} infinite 20s linear;
//   height: 40vmin;
//   pointer-events: none;
// `;

// const Link = styled.a`
//   color: #61dafb;
// `;

// const App = () => (
//   <Container>
//     <Header>
//       <Logo src={logo} alt="logo" />
//       <p>
//         Edit
//         {' '}
//         <code>src/App.js</code>
//         {' '}
//         and save to reload.
//       </p>
//       <Link
//         className="App-link"
//         href="https://reactjs.org"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn React
//       </Link>
//       <Counter />
//     </Header>
//   </Container>

// );

// export default App;

/*!
 *
 * Angle - Bootstrap Admin App + ReactJS
 *
 * Version: 3.5.5
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */
import React from 'react';


import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';

import Photo from './component/Photo';

function Home() {
  return <h2>Home</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/photo">Photo</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/photo">
            <Photo />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
