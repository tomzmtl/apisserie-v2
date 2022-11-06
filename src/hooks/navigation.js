import { useNavigate } from "react-router"

export const useNavigation = () => {
  const navigate = useNavigate()
  return (path) => navigate(path)
}
