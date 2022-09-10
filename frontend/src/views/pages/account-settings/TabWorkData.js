// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Components Imports
import { getLocalStorage } from 'src/hooks/helpers'
import TabWork from './TabWork'

const TabWorkData = ({ id }) => {
  // ** State
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')

  useEffect(() => {
    axios
      // .get('http://localhost:8000/api/user/view/', { params: { id } })
      .get(`http://localhost:8000/api/user/view/${id}`, {
        headers: {
          Authorization: `Bearer ${storageChecked}`
        }
      })
      .then(response => {
        setData(response.data)
        setError(false)
      })
      .catch(() => {
        setData(null)
        setError(true)
      })
  }, [id])

  if (data) {
    return <TabWork data={data} />
  } else {
    return null
  }
}

export default TabWorkData
