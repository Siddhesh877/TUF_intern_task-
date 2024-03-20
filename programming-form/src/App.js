import react from 'react';
import ProgrammingForm from './components/ProgrammingForm';
import './App.css';


function App() {
  return (
  <div className="App">
    <header className="App-header">
      <h3>Submit Your Code</h3>
    </header>
    <main>
      <div className='mainForm'>
        <ProgrammingForm />
      </div>
      
    </main>
  </div>
  );
}

export default App;
