import axios, {
	AxiosInstance,
	AxiosResponse,
	AxiosError,
	InternalAxiosRequestConfig,
} from 'axios'

export const baseURL = import.meta.env.VITE_APP_BASE_API_URL

// Buat instance axios
const ApiService: AxiosInstance = axios.create({
	baseURL: `${baseURL}/api/json/v1/1`, // Ganti dengan URL backend Anda
	timeout: 10000, // Anda bisa menyesuaikan timeout sesuai kebutuhan
})

// Tambahkan interceptor untuk request
ApiService.interceptors.request.use(
	(
		config: InternalAxiosRequestConfig
	): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
		// Modifikasi request (tanpa Authorization header)
		// console.log('Request sent with config:', config) // Optional: Logging request
		return config
	},
	(error: AxiosError): Promise<AxiosError> => {
		console.error('Request error:', error)
		return Promise.reject(error)
	}
)

// Tambahkan interceptor untuk response
ApiService.interceptors.response.use(
	(response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> => {
		// console.log('Response received:', response) // Optional: Logging response
		return response
	},
	(error: AxiosError): Promise<AxiosError> => {
		console.error('Response error:', error)
		return Promise.reject(error)
	}
)

export default ApiService
