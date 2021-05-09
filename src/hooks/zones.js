import API from '@aws-amplify/api'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ZONE_API } from "../constants"
import { makeTimestamp } from '../helpers'
import { setZones, setIsLoading } from '../actions/zones'

export const useLoadZones = () => {
  const dispatch = useDispatch()
  const [ts, setTs] = useState(makeTimestamp())

  const sendRequest = useCallback(
    () => {
      setTs(makeTimestamp())

      API
        .get(ZONE_API, '/zones/id')
        .then(response => dispatch(setZones(response)))
        .catch(error => console.log(error))
        .finally(() => dispatch(setIsLoading(false)))
    }, [dispatch])
  
  useEffect(() => {
    dispatch(setIsLoading(true))

    sendRequest()
  }, [dispatch, sendRequest, ts])

  return { sendRequest }
}