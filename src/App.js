import logo from './logo.svg';
import './App.css';

function App() {

  window.electronAPI.fetchRenderAfterMainReplay(async (event) => {
    console.log('fetch render from main =>');
    const res = await fetchFromRenderAfterMain();
    
  });

  const fetchFromRender = async () => {
    try {
      // const response = await fetch("https://localhost:4433");
      console.log('click Fetch from Render')
      const res = await fetch('https://localhost:4000', { mode: 'cors' })
      console.log('click => ', await res.text())
    } catch (error) {
      console.log(error)
    }
  }

  const fetchFromMain = async () => {
    try {
      // const response = await fetch("https://localhost:4433");
      console.log('click test')
      await window.electronAPI.fetchFromMain();
    } catch (error) {
      console.log(error)
    }
  }


  const fetchFromRenderAfterMain = async () => {
    try {
      // const response = await fetch("https://localhost:4433");
      console.log('fetch from Render after Main')
      const res = await fetch('https://localhost:4000', { mode: 'cors' })
      console.log('click => ', await res.text())
    } catch (error) {
      console.log(error)
    }
  }

  const clickFetchFromRenderAfterMain = async () => {
    try {
      // const response = await fetch("https://localhost:4433");
      console.log('click Fetch from Render after Main')
      await window.electronAPI.fetchRenderAfterMain();
      
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          className="App-link"
          onClick={() => fetchFromRender()}
        >
          Fetch from Render
        </button>
        <button
          className="App-link"
          onClick={() => fetchFromMain()}
        > Fetch from Main </button>
        <button
          className="App-link"
          onClick={() => clickFetchFromRenderAfterMain()}
        >
          Fetch from Render after Main
        </button>
      </header>
    </div>
  );
}

export default App;
