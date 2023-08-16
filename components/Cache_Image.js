import React, { Component } from "react";
import { Image } from "react-native";
import shorthash from "shorthash";
import RNFS from "react-native-fs";

export default class Cache_Image extends Component {
  state = {
    source: null
  };

  componentDidMount = async () => {
    const { uri } = this.props;
    const name = shorthash.unique(uri);
    const path = `${RNFS.CachesDirectoryPath}${name}`;

    const image = await RNFS.exists(path);

    if (image === true) {
      this.setState({
        source: { uri: "file://" + path }
      });
      return;
    }

    RNFS.downloadFile({
      fromUrl: uri,
      toFile: path
    }).promise.then(r => {
      this.setState({
        source: { uri: uri }
      });
    });
    // const newImage = await RNFS.downloadFile(uri, path);
  };

  render() {
    return <Image source={this.state.source} style={this.props.style} />;
  }
}
