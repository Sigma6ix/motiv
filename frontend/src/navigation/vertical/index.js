// ** Icon imports
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded'
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded'
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'

const navigation = () => {
  return [
    {
      title: 'Surveys',
      icon: DashboardRoundedIcon,
      path: '/dashboard'
    },
    {
      title: 'Admin Panel',
      icon: EqualizerRoundedIcon,
      path: '/admin-panel'
    },
    {
      title: 'Profile',
      icon: AccountCircleRoundedIcon,
      path: '/profile'
    },
    {
      title: 'Access Control',
      icon: AdminPanelSettingsRoundedIcon,
      path: '/acl',
      action: 'read',
      subject: 'acl-page'
    },
    {
      title: 'Settings',
      icon: SettingsRoundedIcon,
      path: '/account-settings',
      action: 'manage',
      subject: 'settings-page'
    }
  ]
}

export default navigation
