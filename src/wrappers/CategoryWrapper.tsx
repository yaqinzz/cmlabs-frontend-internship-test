import { Swiper, SwiperSlide } from 'swiper/react'
import CategoryCard from '../components/CategoryCard'
import { Link } from 'react-router-dom'
import useCategory from '../hooks/UseHooks'
import { Category } from '../types/type'

export default function CategoryWrapper() {
	const { data, loading, error } = useCategory('/categories.php')

	console.log('data', data)

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	return (
		<section id='Categories' className='mt-[30px] lg:mt-12'>
			<div className='flex items-center justify-between px-5 lg:px-10'>
				<h2 className='font-bold'>By Categories</h2>
			</div>
			<div className='swiper w-full mt-3'>
				<Swiper
					className='w-full mt-3'
					direction='horizontal'
					spaceBetween={16}
					slidesPerView='auto'
					slidesOffsetBefore={20}
					slidesOffsetAfter={20}>
					{(data as Category[]).map(category => (
						<SwiperSlide
							key={category.idCategory}
							className='!w-fit pb-[30px] lg:pb-8'>
							<Link to={`/category/${category.strCategory}`}>
								<CategoryCard category={category} />
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	)
}
