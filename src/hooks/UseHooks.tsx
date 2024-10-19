import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import ApiService from '../api/ApiService'
import { Recipe, Category } from '../types/type'

// Helper function to build query string from params
const buildQueryString = (params: Record<string, string | number>): string =>
	new URLSearchParams(
		Object.entries(params).reduce<Record<string, string>>(
			(acc, [key, value]) => {
				acc[key] = String(value) // Ensure all values are strings
				return acc
			},
			{}
		)
	).toString()

type DataType = Recipe[] | Category[] | Recipe | Category // Support for both arrays and single objects

interface UseCategoryOptions {
	withSlug?: boolean
	queryParams?: Record<string, string | number> // Optional query params
}

const useCategory = (
	endpoint: string,
	options: UseCategoryOptions = { withSlug: true }
) => {
	const { slug } = useParams<{ slug: string }>()
	const [data, setData] = useState<DataType>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const hasFetched = useRef(false)

	useEffect(() => {
		if (hasFetched.current) return
		hasFetched.current = true

		const fetchData = async () => {
			try {
				let url = endpoint

				// Add slug if required and available
				if (options.withSlug && slug) {
					url += `/${slug}`
				}

				// Add query parameters if provided
				if (options.queryParams) {
					const queryString = buildQueryString(options.queryParams)
					url += `?${queryString}`
				}

				const response = await ApiService.get(url)
				console.log('response', response.data)

				if (response.data) {
					const { meals, categories } = response.data

					if (meals) {
						// If the response contains "meals"
						if (Array.isArray(meals)) {
							setData(meals as Recipe[])
						} else {
							setError('Unexpected data format in meals')
						}
					} else if (categories) {
						// If the response contains "categories"
						if (Array.isArray(categories)) {
							setData(categories as Category[])
						} else {
							setError('Unexpected data format in categories')
						}
					} else {
						setError('No meals or categories found in response')
					}
				} else {
					setError('No data returned from API')
				}
			} catch (err) {
				console.error(err)
				setError('Failed to fetch data')
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [endpoint, slug, options])

	return { data, loading, error }
}

export default useCategory
