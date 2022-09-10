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

const Employees = () => {
  const [employeeData, setEmployeeData] = useState([])

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')
  const [scans, setScans] = useState()

  useEffect(() => {
    numScans()
  }, [])

  useEffect(() => {
    getEmployeeData()
  }, [])

  const getEmployeeData = async () => {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/employee/data',
      headers: {
        Authorization: `Bearer ${storageChecked}`
      }
    })
    if (response.status === 200) {
      setEmployeeData(response.data.result)
    }
  }

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
        <TableFilter employeeData={employeeData} scans={scans} />
      </Grid>
    </Grid>
  )
}

export default Employees
