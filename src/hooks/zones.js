import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setZones, setIsLoading } from '../actions/zones'
import { getZones } from '../api/zones'

export const useLoadZones = (ts) => {
  const dispatch = useDispatch()

  const load = useCallback(
    () => {
      dispatch(setIsLoading(true))

      getZones()
        .then(response => dispatch(setZones(response)))
        .catch(error => console.log(error))
        .finally(() => dispatch(setIsLoading(false)))
    }, [dispatch])
  
  useEffect(() => {
    load()
  }, [dispatch, load, ts])

  return { load }
}
