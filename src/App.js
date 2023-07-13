import './App.css';
import Navbar from './components/Navbar';
import Register from './components/Register';

function App() {
  return (
    <>
      <Navbar />
    <div className="container">
   <h1>TASK MANAGER APP</h1>
    <Register />
    </div>

    </>
  );
}

export default App;
