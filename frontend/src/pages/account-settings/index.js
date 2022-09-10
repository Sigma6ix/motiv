// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabAccountData from 'src/views/pages/account-settings/TabAccountData'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { isAuth } from 'src/hooks/helpers'
import TabWork from 'src/views/pages/account-settings/TabWork'
import TabEmployeeData from 'src/views/pages/account-settings/TabEmployeeData'
import TabWorkData from 'src/views/pages/account-settings/TabWorkData'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  marginLeft: theme.spacing(2.5),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState('account')

  // ** Auth variables
  const id = isAuth()._id

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline sx={{ fontSize: '1.125rem' }} />
                <TabName>Account</TabName>
              </Box>
            }
          />
          <Tab
            value='personal'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline sx={{ fontSize: '1.125rem' }} />
                <TabName>Personal</TabName>
              </Box>
            }
          />
          <Tab
            value='work'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WorkOutlineRoundedIcon sx={{ fontSize: '1.125rem' }} />
                <TabName>Work</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccountData id={id} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='personal'>
          <TabEmployeeData id={id} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='work'>
          <TabWorkData id={id} />
        </TabPanel>
      </TabContext>
    </Card>
  )
}
AccountSettings.acl = {
  action: 'manage',
  subject: 'settings-page'
}

export default AccountSettings
