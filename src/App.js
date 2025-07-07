import logo from './logo.svg';
import './App.css';
import Header from './features/Header/Header';
import Home from './features/Home/Home';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Home />
      </main>
      <aside></aside>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
