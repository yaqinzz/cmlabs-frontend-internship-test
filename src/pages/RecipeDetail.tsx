import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Recipe } from '../types/type'
import { Link, useParams } from 'react-router-dom'
import ApiService from '../api/ApiService'

export default function RecipeDetail() {
	const { slug } = useParams<{ slug: string }>()
	const [activeTab, setActiveTab] = useState('ingredients')

	const handleTabClick = (tab: string) => {
		setActiveTab(tab)
	}
	// Helper function to extract YouTube video ID from URL
	const extractVideoId = (url: string) => {
		const regex =
			/(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
		const match = url.match(regex)
		return match ? match[1] : ''
	}
	const [recipes, setRecipes] = useState<Recipe[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const hasFetched = useRef(false)

	const extractIngredients = recipe => {
		const ingredients = []

		for (let i = 1; i <= 20; i++) {
			const ingredient = recipe[`strIngredient${i}`]
			const measure = recipe[`strMeasure${i}`]

			// Hanya tambahkan ingredient yang ada isinya
			if (ingredient && ingredient.trim()) {
				ingredients.push({
					name: ingredient,
					measure: measure?.trim() || '',
				})
			}
		}

		return ingredients
	}

	// Fungsi untuk fetch data berdasarkan kategori
	useEffect(() => {
		if (hasFetched.current) return
		hasFetched.current = true

		ApiService.get(`lookup.php?i=${slug}`)
			.then(response => {
				const meals = response.data.meals
				if (meals) {
					const fetchedRecipes = meals.map((meal: Recipe) => ({
						...meal,
						ingredients: extractIngredients(meal),
					}))
					console.log('fetchedRecipes', fetchedRecipes)

					setRecipes(fetchedRecipes)
				} else {
					setError('Recipe not found')
				}
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
							alt='icon'
						/>
					</div>
				</Link>
				<button className='appearance-none'>
					<div className='flex items-center justify-center w-10 h-10 rounded-full bg-white/20'>
						<img
							src='/assets/images/icons/heart.svg'
							className='w-5 h-5 object-contain'
							alt='icon'
						/>
					</div>
				</button>
			</nav>
			<header
				id='Gallery'
				className='relative w-full h-[520px] flex shrink-0 rounded-b-[40px] bg-black overflow-hidden'>
				<div className='swiper'>
					<Swiper
						className='w-full'
						direction='horizontal'
						slidesPerView='auto'>
						{recipes.map(recipe => (
							<SwiperSlide key={recipe.idMeal}>
								<div className='relative w-full h-full flex shrink-0'>
									<div className='gradient-filter absolute w-full h-full bg-[linear-gradient(180deg,rgba(0,0,0,0)40.47%,#000000_81.6%)] z-10' />
									<img
										src={`${recipe.strMealThumb}`}
										className='w-full h-full object-cover'
										alt='thumbnail'
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<div className='absolute bottom-0 w-full flex flex-col gap-5 z-20'>
					{/* If we need pagination */}
					<div className='swiper-pagination !-top-5 *:!bg-white' />
					<div className='flex justify-between p-5 pb-[23px] gap-3'>
						<div className='flex flex-col gap-[6px]'>
							<p className='font-semibold text-[#FF4C1C]'>
								Top {recipes[0]?.strCategory}
							</p>
							<h1 className='font-bold text-[34px] leading-[46px] text-white'>
								{recipes[0]?.strMeal}
							</h1>
						</div>
						<div className='flex shrink-0 items-center w-fit h-fit rounded-full py-1 px-2 bg-white/20 backdrop-blur'>
							<img
								src='/assets/images/icons/Star 1.svg'
								className='w-4 h-4'
								alt='star'
							/>
							<span className='font-semibold text-xs leading-[18px] text-white'>
								4.3
							</span>
						</div>
					</div>
				</div>
			</header>
			<section id='Description' className='flex flex-col gap-4 px-5 mt-[30px]'>
				<div className='flex flex-col gap-2'>
					<h2 className='font-bold'>About</h2>
					<p className='leading-8'>{recipes[0].strInstructions}</p>
				</div>
				<div className='flex items-center justify-between gap-3'>
					<div className='flex items-center gap-3'>
						<div className='flex shrink-0 w-[50px] h-[50px] rounded-full overflow-hidden'>
							<img
								src={`${recipes[0].strMealThumb}`}
								className='w-full h-full object-cover'
								alt='avatar'
							/>
						</div>
					</div>
					<div className='flex items-center'>
						<img
							src='/assets/images/icons/Star 1.svg'
							className='w-[18px] h-[18px]'
							alt='star'
						/>
						<img
							src='/assets/images/icons/Star 1.svg'
							className='w-[18px] h-[18px]'
							alt='star'
						/>
						<img
							src='/assets/images/icons/Star 1.svg'
							className='w-[18px] h-[18px]'
							alt='star'
						/>
						<img
							src='/assets/images/icons/Star 1.svg'
							className='w-[18px] h-[18px]'
							alt='star'
						/>
						<img
							src='/assets/images/icons/Star 1.svg'
							className='w-[18px] h-[18px]'
							alt='star'
						/>
					</div>
				</div>
			</section>
			<section id='Details' className='mt-[30px] mb-20'>
				<div className='flex items-center justify-between px-5'>
					<h2 className='font-bold'>Details</h2>
				</div>
				<div className='swiper-tabs w-full overflow-hidden mt-3'>
					<div
						className='swiper-wrapper'
						id='default-tab'
						data-tabs-toggle='#default-tab-content'
						role='tablist'
						data-tabs-active-classes='shadow-[0_10px_20px_0_#FF4C1C80] !bg-[#FF4C1C]'
						data-tabs-inactive-classes='!bg-black'>
						<Swiper
							className='w-full mt-3'
							direction='horizontal'
							spaceBetween={16}
							slidesPerView='auto'
							slidesOffsetBefore={20}
							slidesOffsetAfter={20}>
							<SwiperSlide className='!w-fit pb-[26px]'>
								<button
									className={`flex items-center gap-[10px] py-3 px-4 rounded-full font-semibold transition-all duration-300 ${
										activeTab === 'ingredients'
											? '!text-white !bg-[#FF4C1C] hover:shadow-[0_10px_20px_0_#FF4C1C80] hover:!bg-[#FF4C1C]'
											: '!text-white bg-black'
									}`}
									id='ingredients-tab'
									data-tabs-target='#ingredients'
									type='button'
									role='tab'
									aria-controls='ingredients'
									aria-selected={activeTab === 'ingredients'}
									onClick={() => handleTabClick('ingredients')}>
									<img
										src='/assets/images/icons/coffee-white.svg'
										className='w-[22px] h-[22px]'
										alt='icon'
									/>
									<h3>Ingredients</h3>
								</button>
							</SwiperSlide>
							<SwiperSlide className='!w-fit pb-[26px]'>
								<button
									className={`flex items-center gap-[10px] py-3 px-4 rounded-full font-semibold transition-all duration-300 ${
										activeTab === 'tutorials'
											? '!text-white !bg-[#FF4C1C] hover:shadow-[0_10px_20px_0_#FF4C1C80] hover:!bg-[#FF4C1C]'
											: '!text-white bg-black'
									}`}
									id='tutorials-tab'
									data-tabs-target='#tutorials'
									type='button'
									role='tab'
									aria-controls='tutorials'
									aria-selected={activeTab === 'tutorials'}
									onClick={() => {
										handleTabClick('tutorials')
									}}>
									<img
										src='/assets/images/icons/note-favorite-white.svg'
										className='w-[22px] h-[22px]'
										alt='icon'
									/>
									<h3>Tutorials</h3>
								</button>
							</SwiperSlide>
							<SwiperSlide className='!w-fit pb-[26px]'>
								<button
									className={`flex items-center gap-[10px] py-3 px-4 rounded-full font-semibold transition-all duration-300 ${
										activeTab === 'reviews'
											? '!text-white !bg-[#FF4C1C] hover:shadow-[0_10px_20px_0_#FF4C1C80] hover:!bg-[#FF4C1C]'
											: '!text-white bg-black'
									}`}
									id='reviews-tab'
									data-tabs-target='#reviews'
									type='button'
									role='tab'
									aria-controls='reviews'
									aria-selected={activeTab === 'reviews'}
									onClick={() => {
										handleTabClick('reviews')
									}}>
									<img
										src='/assets/images/icons/star-white.svg'
										className='w-[22px] h-[22px]'
										alt='icon'
									/>
									<h3>Reviews</h3>
								</button>
							</SwiperSlide>
						</Swiper>
					</div>
				</div>
				<div id='default-tab-content'>
					{activeTab === 'ingredients' && (
						<div
							className='px-5'
							id='ingredients'
							role='tabpanel'
							aria-labelledby='ingredients-tab'>
							<ul className='list-disc pl-5'>
								{recipes[0]?.ingredients.map((ingredient, index) => (
									<li key={index}>
										<strong>{ingredient.name}</strong>: {ingredient.measure}
									</li>
								))}
							</ul>
						</div>
					)}

					{activeTab === 'tutorials' && (
						<div
							className='px-5'
							id='tutorials'
							role='tabpanel'
							aria-labelledby='tutorials-tab'>
							<iframe
								className='w-full aspect-video rounded-[20px] bg-[#D9D9D9]'
								src={`https://www.youtube.com/embed/${extractVideoId(
									recipes[0].strYoutube
								)}`}
							/>
							<div className='list-items-container flex flex-col mt-[26px]'>
								{/* {(data as Recipe).tutorials.map((tutorial, index) => (
									<div className='list flex gap-[14px]'>
										<div className='flex relative'>
											<div className='relative z-10 flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-white shadow-[0_12px_30px_0_#D6D6D680] font-bold text-sm leading-[21px]'>
												<span>{index + 1}</span>
											</div>

											<div className='line absolute left-1/2 transform -translate-x-1/2 h-full border-dashed border border-[#DEDFEB]' />
										</div>
										<p className='leading-8 pb-[30px]'>{tutorial.name}</p>
									</div>
								))} */}
							</div>
						</div>
					)}
					{activeTab === 'reviews' && (
						<div
							className=' px-5'
							id='reviews'
							role='tabpanel'
							aria-labelledby='reviews-tab'>
							<div className='flex flex-col gap-5'>
								<div className='review-card flex flex-col pb-5 border-b border-[#E7E7E7] gap-3'>
									<p className='leading-8'>
										Hemat uang jadinya gaperlu beli burger di luar, udah bisa
										masak sendiri hehehe
									</p>
									<div className='flex items-center justify-between gap-3'>
										<div className='flex items-center gap-3'>
											<div className='flex shrink-0 w-[50px] h-[50px] rounded-full overflow-hidden'>
												<img
													src='/assets/images/photos/photo-2.png'
													className='w-full h-full object-cover'
													alt='avatar'
												/>
											</div>
											<div className='flex flex-col gap-[2px]'>
												<p className='font-semibold'>Shayna</p>
												<p className='text-sm leading-[21px] text-[#848486]'>
													12 Days Ago
												</p>
											</div>
										</div>
										<div className='flex items-center'>
											<img
												src='/assets/images/icons/Star 1.svg'
												className='w-[18px] h-[18px]'
												alt='star'
											/>
											<img
												src='/assets/images/icons/Star 1.svg'
												className='w-[18px] h-[18px]'
												alt='star'
											/>
											<img
												src='/assets/images/icons/Star 1.svg'
												className='w-[18px] h-[18px]'
												alt='star'
											/>
											<img
												src='/assets/images/icons/Star 1.svg'
												className='w-[18px] h-[18px]'
												alt='star'
											/>
											<img
												src='/assets/images/icons/Star 1.svg'
												className='w-[18px] h-[18px]'
												alt='star'
											/>
										</div>
									</div>
								</div>
								<div className='review-card flex flex-col pb-5 border-b border-[#E7E7E7] gap-3'>
									<p className='leading-8'>
										Recipe paling enak menurut gue karena anak gak pernah bosan
										makan ini terus setiap harinya, thank you banget ya shay...
									</p>
									<div className='flex items-center justify-between gap-3'>
										<div className='flex items-center gap-3'>
											<div className='flex shrink-0 w-[50px] h-[50px] rounded-full overflow-hidden'>
												<img
													src='/assets/images/photos/photo-3.png'
													className='w-full h-full object-cover'
													alt='avatar'
												/>
											</div>
											<div className='flex flex-col gap-[2px]'>
												<p className='font-semibold'>ShSarina Dwinaayna</p>
												<p className='text-sm leading-[21px] text-[#848486]'>
													12 Days Ago
												</p>
											</div>
										</div>
										<div className='flex items-center'>
											<img
												src='/assets/images/icons/Star 1.svg'
												className='w-[18px] h-[18px]'
												alt='star'
											/>
											<img
												src='/assets/images/icons/Star 1.svg'
												className='w-[18px] h-[18px]'
												alt='star'
											/>
											<img
												src='/assets/images/icons/Star 1.svg'
												className='w-[18px] h-[18px]'
												alt='star'
											/>
											<img
												src='/assets/images/icons/Star 1.svg'
												className='w-[18px] h-[18px]'
												alt='star'
											/>
											<img
												src='/assets/images/icons/Star-grey.svg'
												className='w-[18px] h-[18px]'
												alt='star'
											/>
										</div>
									</div>
								</div>
								<div className='review-card flex flex-col pb-5 border-b border-[#E7E7E7] gap-3'>
									<p className='leading-8'>
										Hemat uang jadinya gaperlu beli burger di luar, udah bisa
										masak sendiri hehehe
									</p>
									<div className='flex items-center justify-between gap-3'>
										<div className='flex items-center gap-3'>
											<div className='flex shrink-0 w-[50px] h-[50px] rounded-full overflow-hidden'>
												<img
													src='/assets/images/photos/photo-4.png'
													className='w-full h-full object-cover'
													alt='avatar'
												/>
											</div>
											<div className='flex flex-col gap-[2px]'>
												<p className='font-semibold'>Alqowy Putri</p>
												<p className='text-sm leading-[21px] text-[#848486]'>
													12 Days Ago
												</p>
											</div>
										</div>
										<div className='flex items-center'>
											<img
												src='/assets/images/icons/Star 1.svg'
												className='w-[18px] h-[18px]'
												alt='star'
											/>
											<img
												src='/assets/images/icons/Star 1.svg'
												className='w-[18px] h-[18px]'
												alt='star'
											/>
											<img
												src='/assets/images/icons/Star 1.svg'
												className='w-[18px] h-[18px]'
												alt='star'
											/>
											<img
												src='/assets/images/icons/Star 1.svg'
												className='w-[18px] h-[18px]'
												alt='star'
											/>
											<img
												src='/assets/images/icons/Star 1.svg'
												className='w-[18px] h-[18px]'
												alt='star'
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>
		</>
	)
}
