import React from 'react'
import { Category } from '../types/type'

interface CategoryCardProps {
	category: Category // Definisikan props category sebagai objek dari tipe Category
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
	return (
		<div>
			<div className='card'>
				<div className='flex flex-col w-fit min-w-[90px] rounded-[31px] p-[10px] pb-5 gap-[10px] text-center bg-white shadow-[0_12px_30px_0_#D6D6D680] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FF4C1C80] hover:bg-[#FF4C1C] hover:text-white lg:min-w-[110px] lg:p-5 lg:pb-6 lg:gap-5'>
					<div className='flex shrink-0 w-[70px] h-[70px] rounded-full bg-white lg:w-[80px] lg:h-[80px]'>
						<img
							src={category.strCategoryThumb}
							className='object-cover w-full h-full object-top'
							alt={`${category.strCategory} icon`}
						/>
					</div>
					<h3 className='font-semibold text-sm leading-[21px] lg:text-base lg:leading-[24px]'>
						{category.strCategory}
					</h3>
				</div>
			</div>
		</div>
	)
}

export default CategoryCard
