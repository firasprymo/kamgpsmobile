import { Content } from 'native-base';
import React, { useState } from 'react';
import { scale } from 'react-native-size-matters';
import { Images } from '../constants/Images';
import CardComponent from './CardComponent';
import FriendCard from './FriendCard';


export default function FriendsComponent(props) {
    const [data, setData] = useState()
    return(
        <Content contentContainerStyle={{alignItems: 'center', padding:scale(10)}}>
            
            {props.data.data.map((el)=>
                <FriendCard
                    key={el._id}
                    userID={el._id}
                    refresh={props.refresh}
                    type='friends'
                    navigation={props.navigation}
                    data1={el}
                    data={el.IDFriend}
                    />
            )}
            
        </Content>
    )
}