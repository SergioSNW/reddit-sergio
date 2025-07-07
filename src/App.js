import logo from './logo.svg';
import './App.css';
import Header from './features/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <main></main>
      <aside></aside>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
