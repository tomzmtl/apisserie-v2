import { API } from 'aws-amplify'
import { ZONE_API } from '../constants'

export const putZone = zone => API.put(ZONE_API, "/zones", { body: zone })

export const deleteZone = zoneId => API.del(ZONE_API, `/zones/object/${zoneId}`)