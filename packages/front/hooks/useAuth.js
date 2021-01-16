import { loginSelectors } from '@j4d-admin/services'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useAuth = (navigate) => {
  const authenticated = useSelector(loginSelectors.loginSelector)
  useEffect(() => {
    if (!authenticated) {
      navigate('/login')
    }
  }, [authenticated])
}
