import transport from './transport'

const random = max => Math.floor(Math.random() * max) + 1

async function fetchProducts() {
  const url = 'https://jsonplaceholder.typicode.com/albums'
  const { data } = await transport.get(url)

  const cleanedProducts = data.map(album => ({
    id: album.id,
    title: album.title.split(' ', 3).join(' '),
    description: album.title
      .split(' ')
      .slice(3)
      .join(' '),
    colorIds: [...new Array(random(4))]
      .map(() => random(4))
      .filter((val, index, self) => self.indexOf(val) === index),
  }))
  return cleanedProducts
}

export default { fetchProducts }
