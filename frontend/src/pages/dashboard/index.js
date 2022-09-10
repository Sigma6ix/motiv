// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import { FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'

// ** Auth Imports
import { getLocalStorage } from 'src/hooks/helpers'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import axios from 'axios'
import toast from 'react-hot-toast'
import SurveyFormOne from '../../views/forms/form-wizard/SurveyFormOne'

import StepperLinearWithValidation from '../../views/forms/form-wizard/StepperLinearWithValidation'

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
    <>
      <SurveyFormOne />
    </>
  )
}

export default Dashboard
