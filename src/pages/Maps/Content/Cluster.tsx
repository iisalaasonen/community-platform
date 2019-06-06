import * as React from 'react'
import { Marker } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'

import 'react-leaflet-markercluster/dist/styles.min.css'

import { createClusterIcon, createMarkerIcon } from './Sprites'

import { IMapPin, EntityType } from 'src/models/maps.models'

export const getClustersFromPins: React.SFC<Array<IMapPin>> = data => {
  const entities = data.reduce(
    (accumulator, pin) => {
      const { entityType } = pin
      if (!accumulator.hasOwnProperty(entityType)) {
        accumulator[entityType] = []
      }
      accumulator[entityType].push(pin)
      return accumulator
    },
    {} as Record<EntityType, Array<IMapPin>>,
  )

  return (
    <React.Fragment>
      {Object.keys(entities).map(key => {
        return (
          <MarkerClusterGroup
            iconCreateFunction={createClusterIcon(key)}
            key={key}
            maxClusterRadius={60}
          >
            {entities[key].map(pin => (
              <Marker
                key={pin.id}
                position={[pin.location.lat, pin.location.lng]}
                icon={createMarkerIcon(pin)}
              />
            ))}
          </MarkerClusterGroup>
        )
      })}
    </React.Fragment>
  )
}
