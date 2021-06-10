import { Col, Row, Tab, TabHeading, Tabs, Text } from 'native-base';
import React, { useState } from 'react';
import { Image, StyleSheet, Dimensions, View, TouchableOpacity, Modal, TextInput, Switch, ScrollView, ActivityIndicator } from 'react-native';
import { scale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather'
import { api } from '../constants/api_config';
import { Colors } from '../constants/Colors';
import { Images } from '../constants/Images';
import { useAppContext } from '../context/AppContext';
import { CreditCardInput, LiteCreditCardInput } from "../Edited_backages/react-native-credit-card-input/";
import { WebView } from 'react-native-webview'
import AntDesign from 'react-native-vector-icons/AntDesign';



// <CreditCardInput onChange={this._onChange} />
// or
//<LiteCreditCardInput onChange={this._onChange} />

// Note: You'll need to enable LayoutAnimation on android to see LiteCreditCardInput's animations
// UIManager.setLayoutAnimationEnabledExperimental(true);





export default function AddPaymentMethod(props) {

  const [ displayWebview, setDisplayWebview ] = useState(false)
  const {token} = useAppContext()
  const [ step, setStep ] = useState('0')
  const [isEnabled, setIsEnabled] = useState(false);
  const [ valid, setValid ] = useState(false)
  const [ number, setNumber ] = useState({
    value:'',
    status: false,
  })
  const [ expiry, setExpiry ] = useState({
    value:'',
    status: false,
  })
  const [ CCV, setCCV ] = useState({
    value:'',
    status: false,
  })
  const [ loading, setLoading ] = useState(false)
  const [ op, setOp ] = useState(false)
  
  const addCard = () => {

    let mm = expiry.value.split("/")[0]
    let yy = expiry.value.split("/")[1]
    var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({"numeroCarte":number.value,"expirationCarte":{"MM":mm,"YY":yy},"CVV":CCV.value});
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  if (valid) {
    console.log(number.status," ",expiry.status,CCV.status)
    setLoading(true)
    fetch(`${api.url}payements/AjouterCartepayement`, requestOptions)
    .then(response => response.json())
    .then(result => {
      setOp(true)
      setLoading(false)
      console.log(result)
    })
    .catch(error => {
      setLoading(false)
      console.log('error', error)
    });
  }}
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const _onChange = (form) => {
    console.log(form)
    setValid(form.valid)
    setNumber({
      value:form.values.number,
      status: form.status.number,
    })
    setExpiry({
      value:form.values.expiry,
      status: form.status.expiry,
    })
    setCCV({
      value:form.values.cvc,
      status: form.status.cvc,
    })
  };


  return (



    <View style={styles.modalView}>
      <View style={styles.modal}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: Colors.grey3, borderBottomWidth: 1, paddingBottom: scale(10) }}>
          {step!="0" && <TouchableOpacity
          onPress={()=>{
            setStep('0')
          setDisplayWebview(false)
        }}
          style={{
            marginTop: scale(10),
            backgroundColor:'white',
            justifyContent:'center',
            alignItems:'center'
          }}
          >
            <Feather name='corner-down-left' size={25} color={Colors.grey2} />
            </TouchableOpacity>}
          <Text style={{ marginTop: scale(10), fontSize: scale(13), fontWeight: 'bold' }}>Payer</Text>
          <TouchableOpacity style={{
            marginTop: scale(10),
            marginRight: scale(-5)
          }}
            onPress={() => props.close()} >
            <Feather name='x' size={25} color={Colors.grey2} />
          </TouchableOpacity>
        </View>
        
        {step == "0" &&
          <View style={{flexDirection: 'column', marginTop: scale(20), alignItems:'center'}}>
            
            <TouchableOpacity 
            onPress={()=>{setStep("2")}}
            style={{
              width: scale(250),
              height: scale(100),
              borderRadius: scale(20),
              elevation:5,
              backgroundColor: 'white',
              justifyContent:'center',
              alignItems:'center',
              marginBottom: scale(20)

            }}>
              <Image source={Images.paypal} resizeMode='contain' style={{width:scale(50),height:scale(50)}} />
              <Text style={{fontSize:scale(14)}}>Paypal</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{setStep("1")}}
            style={{
              width: scale(250),
              height: scale(100),
              borderRadius: scale(20),
              elevation:5,
              backgroundColor: 'white',
              justifyContent:'center',
              alignItems:'center',
              marginBottom: scale(20)

            }}>
              <Image source={Images.card} resizeMode='contain' style={{width:scale(50),height:scale(50)}} />
              <Text style={{fontSize:scale(14)}}>Credit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{setStep("3")}}
            style={{
              width: scale(250),
              height: scale(100),
              borderRadius: scale(20),
              elevation:5,
              backgroundColor: 'white',
              justifyContent:'center',
              alignItems:'center',
              marginBottom: scale(20)

            }}>
              <Image source={Images.sim} resizeMode='contain' style={{width:scale(50),height:scale(50)}} />
              <Text style={{fontSize:scale(14)}}>SIM</Text>
            </TouchableOpacity>
          </View>
          }
        { step=="1" && 
        <>
        <View >
        <ScrollView >
        <CreditCardInput
        cardScale={0.6}
        allowScroll
        labels={{ number: "Numéro de carte", expiry: "Expiration", cvc: "CVC/CCV" }}
        labelStyle={{
          marginTop: scale(10),
        }}
        onChange={_onChange}
         />
         </ScrollView>
         </View>
        <View style={{flexDirection:'row', justifyContent: 'space-between',marginTop: scale(20)}}>
        <Text style={{color: Colors.grey1, fontSize: scale(12)}}>Vous pouvez retirer votre</Text>
        <Switch
        trackColor={{ false: Colors.grey3, true: Colors.logoBlue }}
        thumbColor={isEnabled ? Colors.welcomeColor3 : Colors.grey1}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
        </View>
       { op ? <View style={{
          marginTop: scale(20),
          width: scale(280),
          height: scale(40),
          borderRadius: scale(10),
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.logoGreen,
          elevation:5
        }}>
          <Text style={{color: Colors.white, fontSize:scale(14)}} > Ajouté ! </Text>
        </View>
       : <TouchableOpacity 
        disabled={loading || !valid}
        onPress={()=>{addCard(token,number,expiry,CCV) }}
        style={{
          marginTop: scale(20),
          width: scale(280),
          height: scale(40),
          borderRadius: scale(10),
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: valid ? Colors.logoBlue : Colors.grey4,
          elevation:5
        }} >
            { loading ? <ActivityIndicator size="large" color="white" /> 
            : <Text style={{color: Colors.white, fontSize:scale(14)}} > Ajoute Carte </Text>}
        </TouchableOpacity>}
        </>
        }
        { step=="2" && 
        <View style={{alignSelf:'center', marginTop:scale(20)}}>
           <TouchableOpacity 
                onPress={()=>{setDisplayWebview(true)
                  setStep('webview')
                }}
            style={{
              width: scale(250),
              height: scale(40),
              borderRadius: scale(10),
              elevation:5,
              backgroundColor: Colors.yellow,
              justifyContent:'center',
              alignItems:'center',
              marginBottom: scale(20),
              flexDirection:'row'

            }}>
              <Image source={Images.paypal} resizeMode='contain' style={{width:scale(30),height:scale(30)}} />
              <Text style={{fontSize:scale(14)}}> Pay with PayPal</Text>
            </TouchableOpacity>
        </View>
        }
  
      { displayWebview && <View style={{ flex:1, position:'absolute',width:width,height:height,
            marginTop:scale(60),
            // borderTopRightRadius:20,
            // borderTopLeftRadius:20,
            // borderColor: 'black',
            // borderTopWidth:30,
            backgroundColor:'white'
    }}>
        <TouchableOpacity
        onPress={()=>{setDisplayWebview(false)
          setStep("2")
        }}
        style={{
            marginTop:scale(2),
            marginLeft:scale(20),
            width:scale(40),
            height: scale(30),
            alignItems:'center',
            justifyContent:'center',
            borderRadius:scale(10),
            elevation:1
            }}>
                <AntDesign name='close' size={scale(20)} />
            </TouchableOpacity>
            <WebView source={{ uri: 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-2H060160JB645312F' }} />
            </View>}
            {step=="3" && 
            <View>
              <View style={{
          alignSelf: 'center',
          width: scale(300),
          height: scale(45),
          borderRadius: scale(10),
          marginTop: scale(20),
          paddingLeft: scale(10),
          backgroundColor: Colors.grey3
        }}>
          <TextInput placeholder='Numéro de carte' style={{ flex: 1, fontSize: scale(12), backgroundColor: null }} />
        </View>
        <View style={{flexDirection:'row', justifyContent: 'space-between', marginTop: scale(20), alignItems:'center'}}>
            <Text style={{color: Colors.grey1}}>Date expiration</Text>
            <View style={{backgroundColor: Colors.grey3, width: scale(70), height:scale(40), borderRadius: scale(20), alignItems:'center'}}>
              <TextInput maxLength={2} placeholder='MM' keyboardType='number-pad' />
            </View>
            <View style={{backgroundColor: Colors.grey3, width: scale(70), height:scale(40), borderRadius: scale(20), alignItems:'center'}}>
            <TextInput maxLength={2} placeholder='YY' keyboardType='number-pad' />
            </View>
        </View>
        <View style={{
          alignSelf: 'center',
          width: scale(300),
          height: scale(45),
          borderRadius: scale(10),
          marginTop: scale(20),
          paddingLeft: scale(10),
          backgroundColor: Colors.grey3
        }}>
          <TextInput placeholder='CVV' style={{ flex: 1, fontSize: scale(12), backgroundColor: null }} />
        </View> 
        <View style={{
          alignSelf: 'center',
          width: scale(300),
          height: scale(45),
          borderRadius: scale(10),
          marginTop: scale(10),
          paddingLeft: scale(10),
          backgroundColor: Colors.grey3,
        }}>
          <TextInput placeholder='Nom' style={{ flex: 1, fontSize: scale(12), backgroundColor: null }} />
        </View>
        <View style={{
          alignSelf: 'center',
          width: scale(300),
          height: scale(45),
          borderRadius: scale(10),
          marginTop: scale(10),
          paddingLeft: scale(10),
          backgroundColor: Colors.grey3
        }}>
          <TextInput placeholder='Prénom' style={{ flex: 1, fontSize: scale(12), backgroundColor: null }} />
        </View>
            </View>
            }
            </View>
    </View>
  )
}

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  modalView: {
    height: height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: width,
    justifyContent: 'flex-end',

  },
  modal: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 20,
    paddingHorizontal: scale(15),
    paddingTop: scale(5),
    elevation: 5,
    width: width,
    backgroundColor: 'white',
    paddingBottom: scale(50),
    height: scale(600),

  }

})