import React, { Component } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import PhotoUpload from 'react-native-photo-upload';
import PixelColor from 'react-native-pixel-color';

export default class App extends Component {
  state = {
    imageString: "",
    hexCode: '#000000'
  }

  photoSelected = (imageData) => {
    if (imageData) {
      this.setState({ imageString: "data:image/png;base64," + imageData });
      PixelColor.getHex('data:image/png;base64,' + imageData, { x: 1, y: 1 })
        .then((pixelColor) => this.setState({ hexCode: pixelColor }))
        .catch((exception) => this.setState({ hexCode: "rip" }));
    }
  }

  getImageDimensions = () => {
    Image.getSize({ uri: this.state.imageString }, (width, height) => console.log(width + " x " + height));
  }

  render() {
    return (
      <View style={styles.container}>
        <PhotoUpload
          format={'PNG'}
          onPhotoSelect={(imageData) => { this.photoSelected(imageData) }}
        >
          <Image
            style={styles.imageStyle}
            resizeMode='cover'
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Solid_black.png'
            }}
          />
        </PhotoUpload>
        <Text style={styles.hexCode}>{this.state.hexCode}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  hexCode: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 100,
  },
  imageStyle: {
    width: 150,
    height: 150,
    borderRadius: 75
  }
});
