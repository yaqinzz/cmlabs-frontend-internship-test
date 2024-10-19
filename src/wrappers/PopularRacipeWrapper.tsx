import { Swiper, SwiperSlide } from 'swiper/react'
import FeaturedRecipeCard from '../components/FeaturedRecipeCard'

import useCategory from '../hooks/UseHooks'
import { Recipe } from '../types/type'

export default function PopularRecipeWrapper() {
	const { data, loading, error } = useCategory('/recipes')

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	return (
		<section id='Popular' className='mt-5 lg:mt-[70px] pb-24 lg:pb-20'>
			<div className='flex items-center justify-between px-5 lg:px-10'>
				<h2 className='font-bold'>Popular Recipes</h2>
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
					{(data as Recipe[]).map(recipe => (
						<SwiperSlide key={recipe.id} className='!w-fit pb-[30px] lg:pb-8'>
							<FeaturedRecipeCard recipe={recipe} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	)
}
