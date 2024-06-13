
import './App.css'
import CowService from './cow/cow.service'
import CowCard from './components/CowCard'

const cows = new Array(3).fill("")
function App() {

  return (
    <>
      {cows.map((cow, index) => {
        return (
          <CowCard key={index} />
        )
      })}
    </>
  )
}

export default App
