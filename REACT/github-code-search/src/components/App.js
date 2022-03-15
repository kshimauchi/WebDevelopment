import './App.css';


function displayInitialPage() {
  return(
    <div>
      <h1>You are at the landing page...</h1>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        { displayInitialPage() }
      </header>
    </div>
  );
}

export default App;
