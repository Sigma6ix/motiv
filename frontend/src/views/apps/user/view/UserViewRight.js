// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import LockOutline from 'mdi-material-ui/LockOutline'
import BellOutline from 'mdi-material-ui/BellOutline'
import LinkVariant from 'mdi-material-ui/LinkVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import BookmarkOutline from 'mdi-material-ui/BookmarkOutline'

// ** Demo Components Imports
import UserViewBilling from 'src/views/apps/user/view/UserViewBilling'
import UserViewOverview from 'src/views/apps/user/view/UserViewOverview'
import UserViewSecurity from 'src/views/apps/user/view/UserViewSecurity'
import UserViewConnection from 'src/views/apps/user/view/UserViewConnection'
import UserViewNotification from 'src/views/apps/user/view/UserViewNotification'
import { getLocalStorage } from 'src/hooks/helpers'
import axios from 'axios'

// ** Styled Tab component
const Tab = styled(MuiTab)(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

const UserViewRight = () => {
  // ** State
  const [value, setValue] = useState('overview')

  const handleChange = newValue => {
    setValue(newValue)
  }

  const [surveyData, setSurveyData] = useState([])

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')

  useEffect(() => {
    getSurveyData()
  }, [])

  const getSurveyData = async () => {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/user/survey-result',
      headers: {
        Authorization: `Bearer ${storageChecked}`
      }
    })
    if (response.status === 200) {
      setSurveyData(response.data.result)
    }
  }

  return (
    <TabContext value={value}>
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Tab value='overview' label='Overview' icon={<AccountOutline sx={{ fontSize: '18px' }} />} />
      </TabList>
      <Box sx={{ mt: 3 }}>
        <TabPanel sx={{ p: 0 }} value='overview'>
          <UserViewOverview surveyData={surveyData} />
        </TabPanel>
      </Box>
    </TabContext>
  )
}

export default UserViewRight
