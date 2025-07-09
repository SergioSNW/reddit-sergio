import logo from './logo.svg';
import './App.css';
import Header from './features/Header/Header';
import Home from './features/Home/Home';
import Subreddits from './features/Subreddits/Subreddits';
import { jsx } from '@emotion/react';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Home />
      </main>
      <aside>
        <Subreddits />
      </aside>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
