import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

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
      markers: [{
        title: 'R. Bancários Sérgio Guerra x R. João Batista Maia',
        level: 0,
        coordinate:{
          latitude: -7.15016224,
          longitude: -34.8407793,
        }
      }]
    }
  }

  label(level) {
    const labels = ['Sem Alagamentos', 'Pouca água (15cm)', 'Alagamento Moderado (30cm)', 'Alagado (45cm)']

    return labels[level]
  }

  pinColor(level) {
    const colors = ['#42a83b', '#34e5eb', '#3c8db5', '#0069e0']

    return colors[level]
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          loadingEnabled={true}
          region={this.state.region}
        >
          {this.state.markers.map((marker, i) => {
            return <MapView.Marker
                      key={i}
                      onLoad={() => this.forceUpdate()}
                      coordinate={marker.coordinate}
                      title={marker.title}
                      pinColor={this.pinColor(marker.level)}
                      description={this.label(marker.level)}
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
