import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightBase,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';

import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {Colors} from '../constants/Colors';
import Box from './Box';
import Text from './Text';

const CustomTouchableHighLight = ({value, onPress}) => {
  const [isPress, setIsPress] = React.useState(false);
  var touchProps = {
    activeOpacity: 1,
    underlayColor: Colors.statusBarColor, // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? styles.pillsPressed : styles.pillsNotPressed, // <-- but you can still apply other style changes
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    // <-- "onPress" is apparently required
  };
  var touchPropsText = {
    style: isPress ? styles.textPressed : styles.textNotPressed,
  };
  return (
    <TouchableHighlight {...touchProps} onPress={onPress}>
      <Text {...touchPropsText}>{value}</Text>
    </TouchableHighlight>
  );
};

export default function Input(props) {
  const [code, setCode] = React.useState('');
  const pinInput = React.createRef();

  const _checkCode = code => {
    if (code != '12345') {
      pinInput.current.shake(this).then(() => setCode(''));
    }
  };
  const handlePinClick = num => {
    let newCode = code;
    if (num == 'sortie') {
      alert('sortie');
    } else if (num == 'del') {
      newCode = newCode.slice(0, -1);
      setCode(newCode);
    } else if (code.length < 5) {
      newCode += num;
      setCode(newCode);
      if (code.length == 4) {
        _checkCode(code);
      }
    }
  };
  const keybord = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  return (
    <Box alignItems="center">
      <Box
        backgroundColor="white"
        elevation={5}
        width={scale(250)}
        height={scale(55)}
        alignItems="center"
        borderRadius={scale(50)}>
        <SmoothPinCodeInput
          editable={false}
          placeholder={
            <View style={{alignItems: 'center'}}>
              <Text
                style={{color: '#1A9EEA', opacity: 0, fontSize: scale(40)}}
                textAlign="center">
                *
              </Text>
            </View>
          }
          mask={
            <View style={{marginTop: scale(15), marginLeft: scale(6)}}>
              <Text
                textAlign="center"
                style={{color: '#1A9EEA', fontSize: scale(40)}}>
                *
              </Text>
            </View>
          }
          maskDelay={1000}
          password={true}
          cellStyle={null}
          cellStyleFocused={null}
          ref={pinInput}
          value={code}
          onTextChange={code => setCode(code)}
          onFulfill={_checkCode}
          codeLength={5}
        />
      </Box>
      <Box style={styles.container}>
        {keybord?.map(keys => (
          <Box flexDirection="row" elevation={5}>
            {keys?.map(it => (
              <Box>
                <CustomTouchableHighLight
               
                  value={it}
                  onPress={() => handlePinClick(it)}
                />
              </Box>
            ))}
          </Box>
        ))}

        <Box flexDirection="row" elevation={5}>
          <TouchableOpacity
            onPress={() => handlePinClick('sortie')}
            style={styles.textPills}>
            <Text style={styles.pillsText}>Sortie</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePinClick('0')}
            style={styles.pillsNotPressed}>
            <Text style={styles.textNotPressed}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePinClick('del')}
            style={styles.textPills}>
            <Text style={styles.pillsText}>Del</Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: scale(22),
    paddingBottom: scale(20),
    paddingTop: scale(10),
    flexDirection: 'column',
    marginTop: scale(20),
    elevation: scale(2),
  },
  pillsNotPressed: {
    backgroundColor: '#fff',
    borderRadius: 100,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(10),
    marginVertical: scale(5),
    elevation: scale(10),
  },
  pillsPressed: {
    backgroundColor: Colors.backgroundSplashBlue,
    borderRadius: 100,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(10),
    marginVertical: scale(5),
    elevation: scale(10),
  },
  textPills: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(10),
    marginVertical: scale(5),
    elevation: scale(10),
  },
  textNotPressed: {
    fontSize: 22,
    color: '#1B9EEA',
    fontWeight: 'bold',
  },
  textPressed: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  pillsText: {
    fontSize: 18,
    color: '#1B9EEA',
  },
});
