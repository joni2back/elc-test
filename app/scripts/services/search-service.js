export const apiUrl = 'http://localhost:3035'

export const handleError = error => console.error(error);
 
export const searchProducts = query => fetch(`${apiUrl}/products/search/?query=${query}`)
    .then(response => response.json())
    .catch(handleError)
