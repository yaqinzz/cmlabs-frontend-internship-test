import { baseURL } from '../api/ApiService'
import { RecipeIngredient } from '../types/type'

interface RecipeProps {
	recipe: RecipeIngredient
}

const IngredientCard: React.FC<RecipeProps> = ({ recipe }) => {
	const thumbnailUrl = `${baseURL}/storage/${recipe.ingredient.photo}`

	return (
		<div className='flex flex-col items-center text-center w-full rounded-[20px] p-[14px] gap-[14px] bg-white shadow-[0_12px_30px_0_#D6D6D680]'>
			<div className='thumbnail flex shrink-0 w-full aspect-[138.5/100] rounded-[20px] bg-[#D9D9D9] overflow-hidden'>
				<img
					src={thumbnailUrl}
					className='w-full h-full object-cover'
					alt={recipe.ingredient.name}
				/>
			</div>
			<div className='flex flex-col gap-[2px]'>
				<p className='font-semibold'>{recipe.ingredient.name}</p>
				<p className='text-sm leading-[21px] text-[#848486]'>1 kilogram</p>
			</div>
		</div>
	)
}
export default IngredientCard
