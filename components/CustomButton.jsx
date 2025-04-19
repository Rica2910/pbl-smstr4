import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className={`bg-secondary rounded-xl justify-center items-center px-4  ${isLoading ? 'opacity-50' : ''} ${containerStyles || ''}`}

        disabled={isLoading}
    >
        <Text className={`text-primary font-semibold text-lg ${textStyles}`}>{title}</Text>

    </TouchableOpacity>
  )
}

export default CustomButton