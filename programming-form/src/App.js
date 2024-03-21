// import react from 'react';
import ProgrammingForm from './components/ProgrammingForm';
import './App.css';
import { BrowserRouter as Router, Switch, Route,Routes, Link } from 'react-router-dom';
import Submissions from './components/Submissions';


function App() {
  return (
    <div className="App">
    <header className="App-header">
      <h3>Submit Your Code</h3>
    </header>
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Form</Link>
          </li>
          <li>
            <Link to="/submissions">Submissions</Link>
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
