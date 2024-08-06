import {  View,  Image,  ActivityIndicator,  } from 'react-native';
import React, { useState } from 'react';
const ImageWithPlaceholder = ({ uri, style }) => {
    const [loading, setLoading] = useState(true);
  
    return (
      <View style={style}>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ position: 'absolute', top: '50%', left: '40%' }}
          />
        )}
        <Image
          source={{ uri }}
          style={[style, loading && { display: 'none' }]}
          onLoadEnd={() => setLoading(false)}
          onError={() => setLoading(false)} // Handle error cases
        />
      </View>
    );
  };
  
  export default ImageWithPlaceholder