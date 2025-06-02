import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {images} from '../constants'

const CustomFormCard = ({data, handlePress, isLoading, containerStyles}) => {
  return (
    <View className="px-4 mt-5">
        <Text>Tanggal permintaan {data.created_at}</Text>
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-secondary w-[100%] h-40 rounded-2xl border border-secondary overflow-hidden  ${isLoading ? 'opacity-50' : ''} ${containerStyles || ''}`}

            disabled={isLoading}
        >
        
                <View className="p-4">
                    <Text className="font-pregular text-2xl">
                        Sampah: {data.sampah}
                    </Text>
                    <Text>Jenis: {data.type}</Text>
                    <Text>Penyumbang: {data.nama}</Text>
                </View>

                <View className="flex w-[100%] h-[50px] items-end justify-center bg-primary px-4">
                    <Text className="font-bold text-3xl">{data.status}</Text>
                </View>

        </TouchableOpacity>
    </View>
  )
}

export default CustomFormCard