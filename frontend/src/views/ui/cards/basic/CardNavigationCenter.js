// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const CardNavigationCenter = () => {
  // ** State
  const [value, setValue] = useState("1")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <Typography sx={{ textAlign: 'center', mb: 2, mt: 3 }} variant='h6'>
          Diversity survey
        </Typography>
        <CardContent sx={{ textAlign: 'center' }}>
          <TabPanel value='1' sx={{ p: 0 }}>
            <Typography variant='body2' sx={{ mb: 8, mt: 2 }}>
              The purpose of this survey is to understand what you as an empoyee value the most.
            </Typography>
            <a href='diversity'>
              <Button variant='contained'>Start Survey</Button>
            </a>
          </TabPanel>
          <TabPanel value='2' sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Compensation survey
            </Typography>
            <Typography variant='body2' sx={{ mb: 4 }}>
            The purpose of this survey is to understand what you as an empoyee value the most.
            </Typography>
            <Button variant='contained'>Start Survey</Button>
          </TabPanel>
          <TabPanel value='3' sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Inclusivity survey
            </Typography>
            <Typography variant='body2' sx={{ mb: 4 }}>
            The purpose of this survey is to understand what you as an empoyee value the most.
            </Typography>
            <Button variant='contained'>Start Survey</Button>
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  )
}

export default CardNavigationCenter
