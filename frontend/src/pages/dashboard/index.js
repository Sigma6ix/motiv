// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import CardNavigationCenter from 'src/views/ui/cards/basic/CardNavigationCenter'

const Dashboard = props => {

  return (
    <>
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(12)} !important` }}>
        <Typography variant='h5'>Surveys</Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <CardNavigationCenter value={'1'}/>
      </Grid>
      {/* <Grid item xs={12} md={12}>
        <CardNavigationCenter value={'2'}/>
      </Grid>
      <Grid item xs={12} md={12}>
        <CardNavigationCenter value={'3'}/>
      </Grid> */}
    </Grid>

    </>
  )
}

export default Dashboard
