// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icons Imports
import MenuUp from 'mdi-material-ui/MenuUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'

const CardTotalEarnings = ({ surveyResult }) => {
  console.log(surveyResult)

  const data = [
    {
      progress: surveyResult.company_culture,
      title: 'Company Culture',
      color: 'primary',
      amount: `${surveyResult.company_culture}%`
    },
    {
      progress: surveyResult.title_and_status,
      color: 'primary',
      title: 'Title & Status',
      amount: `${surveyResult.title_and_status}%`
    },
    {
      progress: surveyResult.compensation,
      title: 'Compensation',
      color: 'primary',
      amount: `${surveyResult.compensation}%`
    },
    {
      progress: surveyResult.leadership,
      title: 'Leadership',
      color: 'primary',
      amount: `${surveyResult.leadership}%`
    },
    {
      progress: surveyResult.learning,
      title: 'Learning',
      color: 'primary',
      amount: `${surveyResult.learning}%`
    },
    {
      progress: surveyResult.diversity,
      title: 'Diversity',
      color: 'primary',
      amount: `${surveyResult.diversity}%`
    }
  ]

  return (
    <Card>
      <CardHeader
        title='Diversity Survey'
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options'>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.5)} !important` }}>
        <Box sx={{ mb: 0.5, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mr: 0.5 }}>
            Employee Name
          </Typography>
        </Box>

        <Typography component='p' variant='caption' sx={{ mb: 7.5 }}>
          Survey Taken: Sun, Sept 11, 2022
        </Typography>

        {data.map((item, index) => {
          return (
            <Box key={item.title} sx={{ mb: index !== data.length - 1 ? 6.5 : undefined }}>
              <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ mr: 2, fontWeight: 600 }}>{item.title}</Typography>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {item.amount}
                </Typography>
              </Box>
              <LinearProgress color={item.color} value={item.progress} variant='determinate' />
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default CardTotalEarnings
