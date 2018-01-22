import transport from './transport'

async function fetchProducts() {
  const url = 'https://jsonplaceholder.typicode.com/albums'
  const { data } = await transport.get(url)

  const cleanedProducts = data.map(album => ({
    id: album.id,
    name: album.name,
    colorId: album.userId,
  }))

  return cleanedProducts
}

export default { fetchProducts }
