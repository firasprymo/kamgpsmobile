import { Content } from 'native-base';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { Images } from '../constants/Images';
import CardComponent from './CardComponent';

const data = [
    {
        placeName: 'Antony Lac 1',
        duration: '30',
        distance: '5.3',
        photo: Images.food2,
        id: "1",
    },
    {
        placeName: 'Six Seven',
        duration: '37',
        distance: '6.2',
        photo: Images.food1,
        id: "2",
    },
    {
        placeName: 'Plan B',
        duration: '12',
        distance: '3',
        photo: Images.food3,
        id: "3",
    },
    {
        placeName: 'KFC',
        duration: '44',
        distance: '8.6',
        photo: Images.food4,
        id: "4",
    },
]

export default function FavouriteComponent() {
    return(
        <Content contentContainerStyle={{alignItems: 'center', padding:scale(10)}}>
            {data.map((el)=>
                <CardComponent key={el.id} type='favourite' data={el} />
            )}
            
        </Content>
    )
}