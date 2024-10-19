import { Swiper, SwiperSlide } from 'swiper/react'
import FeaturedRecipeCard from '../components/FeaturedRecipeCard'
import { useEffect, useRef, useState } from 'react'
import ApiService from '../api/ApiService'
import { useParams } from 'react-router-dom'
import { Category } from '../types/type'

export default function CategoryDetailRecipeWrapper() {
	const { slug } = useParams<{ slug: string }>()
	const [category, setCategory] = useState<Category | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const hasFetched = useRef(false)

	useEffect(() => {
		if (hasFetched.current) return
		hasFetched.current = true

		ApiService.get('/category/' + slug)
			.then(response => {
				console.log(response.data.data.recipes)
				setCategory(response.data.data)
				setLoading(false)
			})
			.catch(error => {
				setError(error)
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
		<section id='MadeByPeople' className='mt-[30px] lg:mt-[50px]'>
			<div className='flex items-center justify-between px-5 lg:px-10'>
				<h2 className='font-bold text-xl lg:text-2xl'>Made By People</h2>
				<a
					href='popular.html'
					className='font-semibold text-xs leading-[18px] text-[#FF4C1C] lg:text-sm lg:leading-[21px]'
				>
					See All
				</a>
			</div>
			<div className='swiper w-full mt-3'>
				<Swiper
					className='w-full mt-3'
					direction='horizontal'
					spaceBetween={16}
					slidesPerView='auto'
					slidesOffsetBefore={20}
					slidesOffsetAfter={20}
				>
					{category?.recipes && category.recipes.length > 0 ? (
						category.recipes.map(recipe => (
							<SwiperSlide key={recipe.id} className='!w-fit'>
								<FeaturedRecipeCard recipe={recipe} />
							</SwiperSlide>
						))
					) : (
						<div className='px-10'>No data available</div>
					)}
				</Swiper>
			</div>
		</section>
	)
}
