import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Browse from './pages/Browse'
import SearchDetails from './pages/SearchDetails'
import CategoryDetails from './pages/CategoryDetails'
import RecipeDetail from './pages/RecipeDetail'
function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Browse />} />
				<Route path='/search' element={<SearchDetails />} />
				<Route path='/category/:slug' element={<CategoryDetails />} />
				<Route path='/recipe/:slug' element={<RecipeDetail />} />
			</Routes>
		</Router>
	)
}

export default App
