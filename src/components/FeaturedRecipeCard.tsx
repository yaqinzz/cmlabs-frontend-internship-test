import React from 'react'
import { Recipe } from '../types/type'
import { baseURL } from '../api/ApiService'

interface RecipeProps {
	recipe: Recipe
}
const FeaturedRecipeCard: React.FC<RecipeProps> = ({ recipe }) => {
	const thumbnailUrl = `${baseURL}/storage/${recipe.thumbnail}`
	return (
		<>
			<a href={`/recipe/${recipe.slug}`} className='card'>
				<div className='relative w-[200px] h-[280px] rounded-[30px] bg-white overflow-hidden lg:w-[240px] lg:h-[320px]'>
					<img
						src={thumbnailUrl}
						className='absolute w-full h-full object-cover'
						alt={recipe.name}
					/>
					<div className='gradient-filter absolute w-full h-full bg-[linear-gradient(180deg,rgba(0,0,0,0)40.47%,#000000_81.6%)] z-10' />
					<div className='relative flex flex-col h-full justify-between p-5 z-20 lg:p-6'>
						<div className='flex shrink-0 items-center w-fit rounded-full py-1 px-2 bg-white/20 backdrop-blur lg:py-2 lg:px-3'>
							<img
								src='/assets/images/icons/Star 1.svg'
								className='w-4 h-4 lg:w-5 lg:h-5'
								alt='star'
							/>
							<span className='font-semibold text-xs leading-[18px] text-white lg:text-sm lg:leading-[20px]'>
								4.5
							</span>
						</div>
						<div className='flex flex-col gap-[6px]'>
							<h3 className='font-bold text-xl leading-[28px] text-white lg:text-2xl lg:leading-[32px]'>
								{recipe.name}
							</h3>
							<p className='font-semibold text-xs leading-[18px] text-[#FF4C1C] lg:text-sm lg:leading-[20px]'>
								{recipe.category.name}
							</p>
						</div>
					</div>
				</div>
			</a>
		</>
	)
}

export default FeaturedRecipeCard
