import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../theme/theme';

import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'

const Weather = () => {
    const [showSearch,toggleSearch] = useState(false);
    const [locations,setLocations] = useState([1,2,3]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='light' />
            <Image
                blurRadius={70}
                source={require('../assets/images/bg.png')}
                style={styles.backgroundImage}
            />
            <View style={styles.searchContainer}>
                <View style={[styles.searchBox, {backgroundColor: showSearch?theme.bgWhite(0.2):'transparent'},]}>
                {
                    showSearch? (
                        <TextInput
                        placeholder='Search city'
                        placeholderTextColor='lightgray'
                        style={styles.input}
                    />
                    ):null
                }
                    <TouchableOpacity style={{backgroundColor:theme.bgWhite(0.3),borderRadius:50,padding: 12,margin: 6,}} onPress={()=>{toggleSearch(!showSearch)}}>
                        <MagnifyingGlassIcon size={25} color="white"/>
                    </TouchableOpacity>
                </View>
                {
                    locations.length>0 && showSearch? (
                        <View style={styles.location}>
                            {
                                locations.map((loc,index)=>{
                                    return(
                                        <TouchableOpacity>
                                            <Text>London</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    ):null
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    searchContainer: {
        position: 'absolute',
        top: 40,
        width: '100%',
        alignItems: 'center',
    },
    searchBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 5,
        width: '80%',
        maxWidth: 400,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: 'white',
    },

    location:{
        width: '100%',
        backgroundColor:'#D1D5DB',
        position: 'absolute',
        top: 64,
        borderRadius:24,
    }
});

export default Weather;
