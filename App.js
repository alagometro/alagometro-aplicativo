import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import moment from 'moment'
import 'moment/locale/pt-br'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      region: {
        latitude: -7.15016224,
        longitude: -34.8407793,
        latitudeDelta: 0.095,
        longitudeDelta: 0.0121,
      },
      markers: []
    }

    this.update()
    setInterval(() => {
      this.update()
    }, 5 * 1000)
  }

  update() {
    fetch('http://alagometro.herokuapp.com/')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({markers: data.map((d) => {
          return {
            title: d.title,
            level: d.level,
            coordinate: {
              latitude: parseFloat(d.lat),
              longitude: parseFloat(d.lng),
            },
            last_update: d.last_update
          }
        })})
      })
  }

  label(level) {
    const labels = ['Sem Alagamentos', 'Pouca água (15cm)', 'Alagamento Moderado (30cm)', 'Alagado (45cm)']

    return labels[level]
  }

  pinColor(level) {
    const colors = ['#42a83b', '#34e5eb', '#3c8db5', '#0069e0']

    return colors[level]
  }

  desc(marker) {
    let updated = moment(marker.last_update)
    updated.locale('pt-br')

    return `${this.label(marker.level)} / ${updated.fromNow()}`
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          loadingEnabled={true}
          region={this.state.region}
          showsUserLocation={true}
          onRegionChangeComplete={(region) => this.setState({region: region})}
        >
          {this.state.markers.map((marker, i) => {
            return <MapView.Marker
                      key={`${i}-${marker.level}`}
                      onLoad={() => this.forceUpdate()}
                      coordinate={marker.coordinate}
                      title={marker.title}
                      pinColor={this.pinColor(marker.level)}
                      description={this.desc(marker)}
                    />

          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
});
