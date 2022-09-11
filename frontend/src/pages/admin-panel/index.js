// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TableFilter from 'src/views/table/data-grid/TableFilter'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { getLocalStorage } from 'src/hooks/helpers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CardFinanceApp from 'src/views/ui/cards/advanced/CardFinanceApp'
import CardTotalEarnings from 'src/views/ui/cards/advanced/CardTotalEarings'

const Employees = () => {
  const [surveyData, setSurveyData] = useState([])
  const [surveyResult, setSurveyResult] = useState([])

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')

  useEffect(() => {
    getSurveyData()
  }, [])

  const getSurveyData = async () => {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/user/all-survey-result',
      headers: {
        Authorization: `Bearer ${storageChecked}`
      }
    })
    if (response.status === 200) {
      setSurveyData(response.data)
      console.log(response.data)
    }
  }

  useEffect(() => {
    getSurveyResult()
  }, [])

  const getSurveyResult = async () => {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/user/survey-result',
      headers: {
        Authorization: `Bearer ${storageChecked}`
      }
    })
    if (response.status === 200) {
      setSurveyResult(response.data)
      console.log(response.data)
    }
  }

  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={4}>
        {surveyData.forEach(surveyResult => {
          return <CardTotalEarnings data={surveyResult} />
        })}
      </Grid> */}
      <Grid item xs={4}>
        <CardTotalEarnings surveyResult={surveyResult} />
      </Grid>
    </Grid>
  )
}

export default Employees
