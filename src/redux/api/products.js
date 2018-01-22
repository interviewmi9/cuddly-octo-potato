import transport from './transport'

async function fetchProducts() {
  const url = 'https://jsonplaceholder.typicode.com/albums'
  const { data } = await transport.get(url)

  const cleanedProducts = data.map(album => ({
    id: album.id,
    title: album.title.split(' ', 3).join(' '),
    description: album.title.split(' ').slice(3).join(' '),
    colorId: album.userId,
  }))

  return cleanedProducts
}

export default { fetchProducts }
