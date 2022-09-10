import cookie from 'js-cookie'

// set in cookie
export const setCookie = (key, value) => {
  if (window !== 'undifined') {
    cookie.set(key, value, {
      expires: 1
    })
  }
}

// remove from cookie
export const removeCookie = key => {
  if (window !== 'undifined') {
    cookie.remove(key, {
      expires: 1
    })
  }
}

// get token from stored cookie
export const getCookie = key => {
  if (window !== 'undifined') {
    return cookie.get(key)
  }
}

export const getLocalStorage = key => {
  if (window !== 'undifined') {
    return localStorage.getItem(key)
  }
}

// set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== 'undifined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

// remove from localstorage
export const removeLocalStorage = key => {
  if (window !== 'undifined') {
    localStorage.removeItem(key)
  }
}

// authentication user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
  console.log('Authenticate helper on signin response')
  setCookie('token', response.data.token)
  setLocalStorage('user', response.data.user)
  next()
}

// access user info from localstorage
export const isAuth = () => {
  if (window !== 'undifined') {
    const storageChecked = getLocalStorage('accessToken')
    if (storageChecked) {
      if (localStorage.getItem('userData')) {
        return JSON.parse(localStorage.getItem('userData'))
      } else {
        return false
      }
    }
  }
}

// remove authentication
export const signout = next => {
  removeCookie('token')
  removeLocalStorage('user')
  next()
}
