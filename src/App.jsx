import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  return (
    <div className='bg-zinc-900 h-screen'>
      <Navbar />
      <div className="mx-8 m-auto my-4">
        <Home />
      </div>
    </div>
  )
}

export default App
