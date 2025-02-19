import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../constants/colors';

export default function DocumentUploadScreen() {
  const navigation = useNavigation();
  const [aadharFile, setAadharFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const buttonScale = useRef(new Animated.Value(1)).current;

  const animatePressIn = () =>
    Animated.spring(buttonScale, {toValue: 0.9, useNativeDriver: true}).start();
  const animatePressOut = () =>
    Animated.spring(buttonScale, {toValue: 1, useNativeDriver: true}).start();

  // Pick Document (JPG, PNG, PDF)
  const pickDocument = async setFile => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      setFile(result);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User canceled document selection');
      } else {
        console.error('Document selection error:', error);
      }
    }
  };

  // Capture Selfie
  const takeSelfie = async () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'front',
      saveToPhotos: true,
      quality: 1,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User canceled selfie capture');
      } else if (response.error) {
        console.error('Camera error:', response.error);
      } else if (response.assets && response.assets.length > 0) {
        setSelfie(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/verinova-logo.png')}
        style={styles.logo}
      />

      <View style={styles.uploadBox}>
        <Text style={styles.title}>Upload Your Documents</Text>

        <View style={styles.uploadSection}>
          <Text style={styles.label}>Upload Aadhar Card (JPG, PNG, PDF)</Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => pickDocument(setAadharFile)}>
            <Text style={styles.uploadText}>Select Aadhar</Text>
          </TouchableOpacity>
          {aadharFile && <Text style={styles.fileName}>{aadharFile.name}</Text>}
        </View>

        <View style={styles.uploadSection}>
          <Text style={styles.label}>Upload PAN Card (JPG, PNG, PDF)</Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => pickDocument(setPanFile)}>
            <Text style={styles.uploadText}>Select PAN</Text>
          </TouchableOpacity>
          {panFile && <Text style={styles.fileName}>{panFile.name}</Text>}
        </View>

        <View style={styles.uploadSection}>
          <Text style={styles.label}>Take a Selfie</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={takeSelfie}>
            <Text style={styles.uploadText}>Take Selfie</Text>
          </TouchableOpacity>
          {selfie && (
            <Image source={{uri: selfie}} style={styles.imagePreview} />
          )}
        </View>

        <Animated.View style={{transform: [{scale: buttonScale}]}}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate('MpinSetup')}
            onPressIn={animatePressIn}
            onPressOut={animatePressOut}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  logo: {width: 140, height: 140, marginBottom: 30},
  uploadBox: {
    width: '100%',
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,
    elevation: 4,
    alignItems: 'center',
  },
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#333'},
  uploadSection: {width: '100%', marginBottom: 20, alignItems: 'center'},
  label: {fontSize: 16, marginBottom: 8, color: '#444', textAlign: 'center'},
  uploadButton: {
    backgroundColor: '#035697',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  uploadText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  fileName: {fontSize: 14, marginTop: 5, color: '#555'},
  imagePreview: {width: 100, height: 100, borderRadius: 8, marginTop: 10},
  nextButton: {
    backgroundColor: '#E2261C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 10,
  },
  nextText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
});
