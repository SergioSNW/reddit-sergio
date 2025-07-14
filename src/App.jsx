import './App.css';
import Header from './features/Header/Header';
import Home from './features/Home/Home';
import Subreddits from './features/Subreddits/Subreddits';
import { ThemeProvider } from './features/Theme/ThemeContext';

function App() {
  console.log('App rendered');
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
