// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { checkSignedIn, renderButton } from 'src/utils/utils'
import Report from './report'

const Dashboard = props => {
  const [scans, setScans] = useState()

  useEffect(() => {
    numScans()
  }, [])

  const numScans = () => {
    const options = {
      method: 'GET',
      url: 'https://api-ssl.bitly.com/v4/bitlinks/bit.ly/3yNQerc/clicks?unit=month&units=-1',
      headers: {
        Authorization: 'Bearer 78abfcf816e86d4ea229da6cc240b34b9938bced'
      }
    }

    axios
      .request(options)
      .then(response => {
        console.log(response.data.link_clicks[0].clicks)
        const allScans = response.data.link_clicks[0].clicks
        setScans(allScans)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Kick start your project 🚀'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>All the best for your new project.</Typography>
            <Typography>
              Please make sure to read our Template Documentation to understand where to go from here and how to use our
              template..........
              <h2>{scans}</h2>
              {/* <div className='App'>{!isSignedIn ? <div id='signin-button'></div> : <Report />}</div> */}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='ACL and JWT 🔒'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              Access Control (ACL) and Authentication (JWT) are the two main security features of our template and are
              implemented in the starter-kit as well.
            </Typography>
            <Typography>Please read our Authentication and ACL Documentations to get more out of them.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Dashboard
