import { useHistory } from 'react-router';

export const useNavigation = () => {
  const history = useHistory()
  return path => history.push(path)
}