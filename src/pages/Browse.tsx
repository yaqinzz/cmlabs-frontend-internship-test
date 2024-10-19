import 'swiper/css'
import CategoryWrapper from '../wrappers/CategoryWrapper'
import PopularRecipeWrapper from '../wrappers/PopularRacipeWrapper'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Browse() {
	const [searchQuery, setSearchQuery] = useState('')
	const navigate = useNavigate()

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value)
	}

	const handleSearch = () => {
		if (searchQuery.length > 0) {
			navigate(`/search?query=${searchQuery}`)
		}
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSearch()
		}
	}

	return (
		<>
			<nav className='flex items-center justify-between px-5 mt-[30px] lg:px-10 lg:mt-12'>
				<a href='/' className='flex shrink-0'>
					<img src='/assets/images/logos/logo.svg' alt='logo' />
				</a>
				<div className='hidden lg:flex items-center gap-8'>
					<a
						href='#'
						className='nav-item font-semibold text-sm leading-[21px] text-[#FF4C1C]'>
						Browse
					</a>
					<a href='#' className='nav-item font-semibold text-sm leading-[21px]'>
						Featured
					</a>
					<a href='#' className='nav-item font-semibold text-sm leading-[21px]'>
						Pricing
					</a>
					<a href='#' className='nav-item font-semibold text-sm leading-[21px]'>
						Settings
					</a>
				</div>
				<a href='#'>
					<div className='flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-[0_10px_20px_0_#D6D6D6AB] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FF4C1C80]'>
						<img
							src='/assets/images/icons/notification.svg'
							className='w-5 h-5 object-contain'
							alt='icon'
						/>
					</div>
				</a>
			</nav>
			<div id='SearchForm' className='px-5 mt-[30px] lg:px-10 lg:mt-12'>
				<div className='flex items-center rounded-full p-[5px_14px] pr-[5px] gap-[10px] bg-white shadow-[0_12px_30px_0_#D6D6D652] transition-all duration-300 focus-within:ring-1 focus-within:ring-[#FF4C1C] lg:p-4 lg:gap-4'>
					<img
						src='/assets/images/icons/note-favorite.svg'
						className='w-6 h-6'
						alt='icon'
					/>
					<input
						type='text'
						name='search'
						value={searchQuery}
						onChange={handleInput}
						onKeyDown={handleKeyDown}
						id='search'
						className='appearance-none outline-none w-full font-semibold placeholder:font-normal placeholder:text-black'
						placeholder='Find our best food recipes'
					/>
					<button
						onClick={handleSearch}
						className='flex shrink-0 w-[42px] h-[42px]'>
						<img src='/assets/images/icons/search.svg' alt='icon' />
					</button>
				</div>
			</div>
			<CategoryWrapper />

			<PopularRecipeWrapper />
			<div
				id='BottomNav'
				className='fixed z-50 bottom-0 w-full max-w-[640px] mx-auto border-t border-[#E7E7E7] py-4 px-5 bg-white/70 backdrop-blur lg:hidden'>
				<div className='flex items-center justify-evenly '>
					<a href='#' className='nav-items'>
						<div className='flex flex-col items-center text-center gap-[7px] text-sm leading-[21px] font-semibold'>
							<img
								src='/assets/images/icons/note-favorite-orange.svg'
								className='w-6 h-6'
								alt='icon'
							/>
							<span>Browse</span>
						</div>
					</a>
					<a href='#' className='nav-items'>
						<div className='flex flex-col items-center text-center gap-[7px] text-sm leading-[21px]'>
							<img
								src='/assets/images/icons/crown-grey.svg'
								className='w-6 h-6'
								alt='icon'
							/>
							<span>Featured</span>
						</div>
					</a>
					<a href='#' className='nav-items'>
						<div className='flex flex-col items-center text-center gap-[7px] text-sm leading-[21px]'>
							<img
								src='/assets/images/icons/receipt-item-grey.svg'
								className='w-6 h-6'
								alt='icon'
							/>
							<span>Pricing</span>
						</div>
					</a>
					<a href='#' className='nav-items'>
						<div className='flex flex-col items-center text-center gap-[7px] text-sm leading-[21px]'>
							<img
								src='/assets/images/icons/setting-2-grey.svg'
								className='w-6 h-6'
								alt='icon'
							/>
							<span>Settings</span>
						</div>
					</a>
				</div>
			</div>
		</>
	)
}
