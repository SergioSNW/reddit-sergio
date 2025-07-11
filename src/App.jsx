import logo from './logo.svg';
import './App.css';
import Header from './features/Header/Header';
import Home from './features/Home/Home';
import Subreddits from './features/Subreddits/Subreddits';

function App() {
  console.log('App rendered');
  return (
    <div className="App">
      <Header />
      <div className="app-container">
        <main className="posts-container">
          <Home />
        </main>
        <aside className="subreddits-container">
          <Subreddits />
        </aside>
      </div>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
    </div>
  );
}

export default App;
