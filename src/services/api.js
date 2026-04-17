const API_URL = 'http://localhost:5000/api'

export const fetchPortfolioData = async () => {
  try {
    const response = await fetch(`${API_URL}/portfolio`)
    if (!response.ok) throw new Error('Failed to fetch')
    return await response.json()
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    return null
  }
}
