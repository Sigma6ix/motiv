// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components
import axios from 'axios'

// ** Demo Components Imports
import UserViewLeft from 'src/views/apps/user/view/UserViewLeft'
import UserViewRight from 'src/views/apps/user/view/UserViewRight'
import { getLocalStorage } from 'src/hooks/helpers'

const UserView = ({ id }) => {
  // ** State
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')

  useEffect(() => {
    axios
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

  console.log('id', id)
  console.log(data)

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <UserViewLeft data={data} />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <UserViewRight />
        </Grid>
      </Grid>
    )
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            User with the id: {id} does not exist. Please check the list of users:{' '}
            <Link href='/apps/user/list'>User List</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserView
