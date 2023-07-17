import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import CreateRecipe from './pages/CreateRecipe'
import SavedRecipes from './pages/SavedRecipes'
import Navabar from './components/Navabar'

function App() {
  return (
    <Router>
      <Navabar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/createRecipe" element={<CreateRecipe/>}/>
        <Route path="/savedRecipes" element={<SavedRecipes/>}/>
      </Routes>
    </Router>
  );
}

export default App;
