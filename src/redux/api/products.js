import transport from './transport'

async function fetchProducts() {
  const url = 'https://jsonplaceholder.typicode.com/albums'
  const { data } = await transport.get(url)

  const cleanedProducts = data.map(album => ({
    id: album.id,
    title: album.title.split(' ', 3).join(' '),
    description: album.title.split(' ').slice(3).join(' '),
    colorId: Math.floor(Math.random() * 4) + 1,
  }))

  return cleanedProducts
}

export default { fetchProducts }
