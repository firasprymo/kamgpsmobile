import { Content } from 'native-base';
import React, { useState } from 'react';
import { Button, Text, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Images } from '../constants/Images';
import CardComponent from './CardComponent';



export default function FavouriteComponent(props) {
    
    
    return(
        <Content contentContainerStyle={{alignItems: 'center', padding:scale(10), flexDirection:'column-reverse'}}>
            {props.data.data.map((el)=>
                <CardComponent
                    key={el._id}
                    navigation={props.navigation}
                    type='favourite'
                    refresh={props.refresh}
                    data={el}
                    />
            )}
            
        </Content>
    )
}