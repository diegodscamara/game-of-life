import './App.css'
import { Button } from './components/ui/button'

function App() {
  return (
    <>
      <div className="p-8 min-h-screen">
        <h1 className="mb-4 font-bold text-2xl">React App</h1>
        <Button variant="default" size="lg">
          Click me 2
        </Button>
      </div>
    </>
  )
}

export default App
