// ** Third Party Imports
import axios from 'axios'

// ** Demo Components Imports
import UserViewPage from 'src/views/apps/user/view/UserViewPage'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

const UserView = () => {
  // ** Hooks
  const auth = useAuth()

  console.log(auth.user)

  return <UserViewPage id={auth.user._id} />
}

export default UserView
