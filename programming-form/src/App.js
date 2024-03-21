// import react from 'react';
import ProgrammingForm from './components/ProgrammingForm';
import './App.css';
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';
import Submissions from './components/Submissions';


function App() {
  return (
    <div className="App">
    <header className="App-header">
      <h3>Code Submissions</h3>
    </header>
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/"><span>Form</span></Link>
          </li>
          <li>
            <Link to="/submissions"><span>Submissions</span></Link>
          </li>
        </ul>
      </nav>
      <main>
        <div className='mainForm'>
      <Routes>
        <Route path="/" element={<ProgrammingForm />}/>
        <Route path="/submissions" element={<Submissions />}/>
      </Routes>
      </div>    
    </main>
    
    
  </Router>
  </div>
  );
}

export default App;
