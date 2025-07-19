
const BASE_URL = 'https://pokeapi.co/api/v2';
export const apiClient = {
  //todo: any 
  async get(endpoint: string): Promise<unknown> {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
    }
    return response.json();
  }
}
