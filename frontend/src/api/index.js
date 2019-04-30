import axios from 'axios'
axios.defaults.baseURL= '/api/'

axios.interceptors.request.use(config=> {
  return config
}, err=> {
  alert('Timeout!')
  return Promise.resolve(err)
})
axios.interceptors.response.use(data=> {
  if (data.status && data.status == 200 && data.data.status == 'error') {
    alert(data.data.msg)
    return
  }
  return data
}, err=> {
  if (err.response.status == 504||err.response.status == 404) {
    alert('Server is down to the blackhole!!!')
  } else {
    console.log(err.response)
    alert('Unknown error!')
  }
  return Promise.resolve(err)
})


//Users

export const login = (form) => {
  return axios.post("user/login", form)
}

export const userList = () => {
  return axios.get("user/list")
}

export const user = (id) => {
  return axios.get(`user/${id}`)
}

//Genres

export const genres = () => {
  return axios.get("genre/list")
}

//Shows

export const shows = () => {
  return axios.get("show/list")
}

export const showsById = (showId) => {
  return axios.get(`show/genre/${showId}`)
}

export const addShow = (form) => {
  return axios.post(
          "show/add-show", 
          form,
          {config: { headers: {'Content-Type': 'multipart/form-data' }}})
}

export const showsByGenreId = (genreId) => {
  return axios.get(`show/genre/${genreId}`)
}

export const showByUserId = (userId) => {
  return axios.get(`show/user/${userId}`)
}