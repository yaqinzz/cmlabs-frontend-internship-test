import { Link, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import ApiService from '../api/ApiService'
import { CategoryList } from '../types/type' // Asumsikan kamu punya tipe ini
// import CategoryLatestWrapper from '../wrappers/CategoryLatestWrapper'

export default function CategoryDetails() {
	const { slug } = useParams<{ slug: string }>() // Nama kategori dari URL params
	const [recipes, setRecipes] = useState<CategoryList[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const hasFetched = useRef(false)

	// Fungsi untuk fetch data berdasarkan kategori
	useEffect(() => {
		if (hasFetched.current) return
		hasFetched.current = true

		ApiService.get(`/filter.php?c=${slug}`)
			.then(response => {
				console.log(response.data.meals) // Debugging di console
				setRecipes(response.data.meals)
				setLoading(false)
			})
			.catch(error => {
				console.error('Error fetching recipes:', error)
				setError(error.message || 'Something went wrong')
				setLoading(false)
			})
	}, [slug])

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	return (
		<>
			<nav className='fixed top-0 left-0 w-full flex items-center justify-between bg-black/70 backdrop-blur-md px-5 py-3 z-20 max-w-[640px] lg:max-w-full lg:px-10 lg:py-5'>
				<Link to={'/'}>
					<div className='flex items-center justify-center w-10 h-10 rounded-full bg-white/20'>
						<img
							src='/assets/images/icons/arrow-left.svg'
							className='w-5 h-5 object-contain'
							alt='Back'
						/>
					</div>
				</Link>
				<h1 className='text-lg font-semibold text-white lg:text-2xl'>
					{slug} Recipes
				</h1>
				<button className='appearance-none'>
					<div className='flex items-center justify-center w-10 h-10 rounded-full bg-white/20'>
						<img
							src='/assets/images/icons/more.svg'
							className='w-5 h-5 object-contain'
							alt='More Options'
						/>
					</div>
				</button>
			</nav>
			<main className='pt-[80px] lg:pt-[100px]'>
				<header className='relative w-full h-fit flex flex-col shrink-0 rounded-b-[40px] lg:rounded-b-[60px]'>
					<div className='px-5 lg:px-10'>
						{recipes.map(recipe => (
							<Link
								to={`/recipe/${recipe.idMeal}`}
								key={recipe.idMeal}
								className='block'>
								<div className='flex items-center gap-4 p-4 my-2 bg-white shadow rounded-lg'>
									<img
										src={recipe.strMealThumb}
										alt={recipe.strMeal}
										className='w-20 h-20 rounded-md object-cover'
									/>
									<p className='font-semibold text-lg'>{recipe.strMeal}</p>
								</div>
							</Link>
						))}
					</div>
				</header>
			</main>
		</>
	)
}
