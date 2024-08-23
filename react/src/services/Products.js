import instance from '../axios'

export const getAllProducts = async () => {
  const response = await instance.get('/api/products/')
  return response.data
}

export const addProducts = async (body) => {
  const response = await instance.post('/api/products/',  body)
  return response.data
}

export const updateProducts = async (body, id) => {
  const response = await instance.put('/api/products/' +  id, body)
  return response.data
}

export const removeProducts = async (id) => {
  const response = await instance.delete('/api/products/' +  id)
  return response.data
}
