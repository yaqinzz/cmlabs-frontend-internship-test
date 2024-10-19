import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Recipe } from '../types/type'
import ApiService from '../api/ApiService'
import RecipeCardResult from '../components/RacipeCardResult'

export default function SearchDetails() {
	const location = useLocation()
	const [searchQuery, setSearchQuery] = useState('')
	const [searchResults, setSearchResults] = useState<Recipe[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const hasFetched = useRef(false)

	useEffect(() => {
		if (hasFetched.current) return
		hasFetched.current = true

		const query = new URLSearchParams(location.search).get('query')
		if (query) {
			setSearchQuery(query)
			performSearch(query)
		}
	}, [location.search])

	const performSearch = async (query: string) => {
		setLoading(true)
		setError(null)
		try {
			const response = await ApiService.get(`/filter.php?c=${query}`)
			setSearchResults(response.data.meals)
			// console.log(response.data.meals)
		} catch (error) {
			setError(error as string)
		} finally {
			setLoading(false)
		}
	}

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value)
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault() // Mencegah submit form secara default
			performSearch(searchQuery)
		}
	}

	const handleSearchClick = () => {
		performSearch(searchQuery)
	}

	return (
		<>
			<nav className='flex items-center justify-between px-5 mt-[30px]'>
				<a href='/' className='flex shrink-0'>
					<img src='assets/images/logos/logo.svg' alt='logo' />
				</a>
				<a href='#'>
					<div className='flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-[0_10px_20px_0_#D6D6D6AB] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FF4C1C80]'>
						<img
							src='assets/images/icons/notification.svg'
							className='w-5 h-5 object-contain'
							alt='icon'
						/>
					</div>
				</a>
			</nav>
			<div className='px-5 mt-[30px]'>
				{loading && <div>Loading...</div>}
				{error && <div>{error}</div>}

				<div className='flex items-center rounded-full p-[5px_14px] pr-[5px] gap-[10px] bg-white shadow-[0_12px_30px_0_#D6D6D652] transition-all duration-300 focus-within:ring-1 focus-within:ring-[#FF4C1C]'>
					<img
						src='assets/images/icons/note-favorite.svg'
						className='w-6 h-6'
						alt='icon'
					/>
					<input
						type='text'
						name='search'
						id='search'
						value={searchQuery}
						onChange={handleInput}
						onKeyDown={handleKeyDown}
						className='appearance-none outline-none w-full font-semibold placeholder:font-normal placeholder:text-black'
						placeholder='Find our best food recipes'
					/>
					<button
						onClick={handleSearchClick}
						className=' flex shrink-0 w-[42px] h-[42px]'>
						<img src='assets/images/icons/search.svg' alt='icon' />
					</button>
				</div>
			</div>
			<section id='SearchResult' className='px-5 mt-[30px]'>
				<div className='flex items-center justify-between'>
					<h2 className='font-bold'>Search Results</h2>
				</div>
				<div className='flex flex-col gap-[18px] mt-[18px]'>
					{searchResults.length > 0 ? (
						searchResults.map(recipe => (
							<RecipeCardResult key={recipe.idMeal} recipe={recipe} />
						))
					) : (
						<p>No results found</p>
					)}
				</div>
			</section>
		</>
	)
}
