// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { getLocalStorage } from 'src/hooks/helpers'
import axios from 'axios'

// const escapeRegExp = value => {
//   return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
// }

const columns = [
  {
    flex: 0.275,
    minWidth: 290,
    field: 'full_name',
    headerName: 'Name',
    renderCell: employeeData => {
      const { row } = employeeData
      // console.log(employeeData)

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar src={row.employeePhotoURL} sx={{ mr: 3, width: 34, height: 34, cursor: 'pointer' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.employeeFullName}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'Location',
    field: 'employee_location',
    renderCell: employeeData => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {employeeData.row.employeeLocation}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'Landing Page',
    field: 'landing_page',
    renderCell: employeeData => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {employeeData.row.landingPageURL}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 110,
    field: 'scans',
    headerName: 'Scans',
    renderCell: scans => {
      console.log(scans)
      return (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {scans.scans}
        </Typography>
      )
    }
  },
  {
    flex: 0.125,
    field: 'submits',
    minWidth: 80,
    headerName: 'Submits',
    renderCell: scans => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {scans.row.scans}
      </Typography>
    )
  }
]

const TableColumns = ({ employeeData, scans }) => {
  // ** States
  // const [data] = useState(rows)
  const [pageSize, setPageSize] = useState(7)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])

  // const handleSearch = searchValue => {
  //   setSearchText(searchValue)
  //   const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

  //   const filteredRows = data.filter(row => {
  //     return Object.keys(row).some(field => {
  //       // @ts-ignore
  //       return searchRegex.test(row[field].toString())
  //     })
  //   })
  //   if (searchValue.length) {
  //     setFilteredData(filteredRows)
  //   } else {
  //     setFilteredData([])
  //   }
  // }

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
    <Card>
      <CardHeader title='Employees' />
      <DataGrid
        getRowId={() => Math.floor(Math.random() * 100000000)}
        autoHeight
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[7, 10, 25, 50]}
        components={{ Toolbar: QuickSearchToolbar }}
        rows={employeeData}
        scans={scans}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        // componentsProps={{
        //   toolbar: {
        //     value: searchText,
        //     clearSearch: () => handleSearch(''),
        //     onChange: event => handleSearch(event.target.value)
        //   }
        // }}
      />
    </Card>
  )
}

export default TableColumns
