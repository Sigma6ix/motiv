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

// ** Demo Components Imports

import CardNavigation from 'src/views/ui/cards/basic/CardNavigation'
import CardNavigationCenter from 'src/views/ui/cards/basic/CardNavigationCenter'
import CardHorizontalRatings from 'src/views/ui/cards/basic/CardHorizontalRatings'

const Dashboard = props => {
  // const [scans, setScans] = useState()

  // useEffect(() => {
  //   numScans()
  // }, [])

  // const numScans = () => {
  //   const options = {
  //     method: 'GET',
  //     url: 'https://api-ssl.bitly.com/v4/bitlinks/bit.ly/3yNQerc/clicks?unit=month&units=-1',
  //     headers: {
  //       Authorization: 'Bearer 78abfcf816e86d4ea229da6cc240b34b9938bced'
  //     }
  //   }

  //   axios
  //     .request(options)
  //     .then(response => {
  //       console.log(response.data.link_clicks[0].clicks)
  //       const allScans = response.data.link_clicks[0].clicks
  //       setScans(allScans)
  //     })
  //     .catch(error => {
  //       console.error(error)
  //     })
  // }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(12)} !important` }}>
        <Typography variant='h5'>Surveys</Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <CardNavigationCenter />
      </Grid>
      <Grid item xs={12} md={12}>
        <CardNavigationCenter />
      </Grid>
      <Grid item xs={12} md={12}>
        <CardNavigationCenter />
      </Grid>
    </Grid>
  )
}

export default Dashboard
