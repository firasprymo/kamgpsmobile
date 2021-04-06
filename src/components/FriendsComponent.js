import { Content } from 'native-base';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { Images } from '../constants/Images';
import CardComponent from './CardComponent';

const data = [
    {
        placeName: 'Steven',
        duration: '30',
        distance: '5.3',
        photo: Images.user3,
        id: "1",
    },
    {
        placeName: 'Sarah',
        duration: '37',
        distance: '6.2',
        photo: Images.user2,
        id: "2",
    },
    {
        placeName: 'Mark',
        duration: '12',
        distance: '3',
        photo: Images.user3,
        id: "3",
    },
    {
        placeName: 'Layla',
        duration: '44',
        distance: '8.6',
        photo: Images.user2,
        id: "4",
    },
]

export default function FriendsComponent() {
    return(
        <Content contentContainerStyle={{alignItems: 'center', padding:scale(10)}}>
            {data.map((el)=>
                <CardComponent key={el.id} type='friends' data={el} />
            )}
            
        </Content>
    )
}