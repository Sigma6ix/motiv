// ** MUI Import
import Grid from '@mui/material/Grid'

/**
 * ! Icons Imports:
 * ! You need to import all the icons which come from the API or from your server and then add these icons in 'icons' variable.
 * ! If you need all the icons from the library, use "import * as Icon from 'mdi-material-ui'"
 * */
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded'
import CachedRoundedIcon from '@mui/icons-material/CachedRounded'
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded'
import ShareRoundedIcon from '@mui/icons-material/ShareRounded'

// ** Custom Components Imports
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'
import axios from 'axios'

const icons = {
  ReviewsRoundedIcon,
  CachedRoundedIcon,
  QrCode2RoundedIcon,
  ShareRoundedIcon
}

const CardStatsHorizontal = ({ data }) => {
  if (data) {
    return (
      <Grid container spacing={6}>
        {data.map((item, index) => {
          const IconTag = icons[item.icon]

          return (
            <Grid item xs={12} md={3} sm={6} key={index}>
              <CardStatisticsHorizontal {...item} icon={<IconTag />} />
            </Grid>
          )
        })}
      </Grid>
    )
  } else {
    return null
  }
}

export default CardStatsHorizontal
