import { useState } from 'react'
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';



function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Signup />
      </div>
    </div>
  )
}

export default App
