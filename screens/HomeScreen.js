import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../theme/theme';

import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import {MapPinIcon,CalendarDaysIcon} from 'react-native-heroicons/solid'

const Weather = () => {
    const [showSearch,toggleSearch] = useState(false);
    const [locations,setLocations] = useState([1,2,3]);

    const handleLocation = (loc)=>{
        console.log(loc);
    }

    return (
        <View style={{flex:1,position: 'relative'}}>
            <StatusBar style='light' />
            <Image
                blurRadius={70}
                source={require('../assets/images/bg.png')}
                style={styles.backgroundImage}
            />
        <SafeAreaView style={styles.container}>
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
                                        <TouchableOpacity key={index} style={styles.locationList} onPress={()=>handleLocation(loc)}>
                                            <MapPinIcon size={20} color='grey'/>
                                            <Text style={{color:'black',fontSize: 18,marginLeft: 8}}>London</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    ):null
                }
            </View>

            {/* Forcast  */}

                <View style={{marginHorizontal: 16,display: 'flex',justifyContent: 'space-around',flex: 1,marginBottom: 8,}}>
                    <Text style={{color: 'white',textAlign: 'center',fontSize: 24,fontWeight: 'bold'}}>London,
                        <Text style={{fontSize: 18,fontWeight: '600',color: '#D1D5DB',}}>United Kingdom</Text>
                    </Text>

                    {/* Weather image */}
                    <View style={{display: 'flex',flexDirection: 'row',justifyContent: 'center',}}>
                        <Image source={require('../assets/images/partlycloudy.png')} style={{width: 52,height:52}}/>
                    </View>

                    {/* Degree celcius */}
                    <View style={{marginVertical: 8,}}>
                        <Text style={{color: '#fff',textAlign: 'center',fontWeight: 'bold',fontSize: 48,marginLeft: 20}}>
                        23&#176;</Text>
                        <Text style={{color: '#fff',textAlign: 'center',fontSize: 20,letterSpacing:2}}>
                        Partly Cloudy</Text>
                    </View>

                    {/* other status */}
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',marginLeft: 16,marginRight: 16,}}>
                        <View style={{flexDirection: 'row', marginHorizontal: 2, alignItems: 'center',}}>
                            <Image source={require('../assets/icons/wind.png')} style={{width: 24,height:24}} />
                            <Text style={{color: 'white',fontWeight: '600',fontSize: 16,}}> 22km</Text>
                        </View>
                        <View style={{flexDirection: 'row', marginHorizontal: 2, alignItems: 'center',}}>
                            <Image source={require('../assets/icons/drop.png')} style={{width: 24,height:24}} />
                            <Text style={{color: 'white',fontWeight: '600',fontSize: 16,}}> 23%</Text>
                        </View>
                        <View style={{flexDirection: 'row', marginHorizontal: 2, alignItems: 'center',}}>
                            <Image source={require('../assets/icons/sun.png')} style={{width: 24,height:24}} />
                            <Text style={{color: 'white',fontWeight: '600',fontSize: 16,}}> 6:05AM
                            </Text>
                        </View>
                  
                    </View>
                </View>

                    {/* Forcast for next days */}

              <View style={{marginBottom: 8,marginTop: 12,marginTop: 16,}}>
                <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',marginHorizontal: 20,}}>
                  <CalendarDaysIcon size="22" color="white" />
                  <Text style={{color: 'white',fontSize: 16,paddingLeft:10}}>Daily forecast</Text>
                </View>

                <ScrollView horizontal contentContainerStyle={{paddingHorizontal: 15}} showsHorizontalScrollIndicator={false}>
                        <View style={{backgroundColor: theme.bgWhite(0.15), display: 'flex', justifyContent: 'center',alignItems: 'center',width: 100,height:100,borderRadius: 12,paddingVertical: 12,marginBottom: 4,marginTop:10,marginRight:10}}
                        >
                            <Image 
                                // source={{uri: 'https:'+item?.day?.condition?.icon}}
                                source={require('../assets/images/heavyrain.png')}
                                style={{width:44,height:44}} />
                          <Text style={{color: 'white'}}>Monday</Text>
                          <Text style={{color: 'white',fontSize: 20,fontWeight: '600',}}>avgTemp&#176;</Text>
                        </View>

                        <View style={{backgroundColor: theme.bgWhite(0.15), display: 'flex', justifyContent: 'center',alignItems: 'center',width: 100,height:100,borderRadius: 12,paddingVertical: 12,marginBottom: 4,marginTop:10,marginRight:10}}
                        >
                            <Image 
                                // source={{uri: 'https:'+item?.day?.condition?.icon}}
                                source={require('../assets/images/heavyrain.png')}
                                style={{width:44,height:44}} />
                          <Text style={{color: 'white'}}>Monday</Text>
                          <Text style={{color: 'white',fontSize: 20,fontWeight: '600',}}>avgTemp&#176;</Text>
                        </View>
                        
                        <View style={{backgroundColor: theme.bgWhite(0.15), display: 'flex', justifyContent: 'center',alignItems: 'center',width: 100,height:100,borderRadius: 12,paddingVertical: 12,marginBottom: 4,marginTop:10,marginRight:10}}
                        >
                            <Image 
                                // source={{uri: 'https:'+item?.day?.condition?.icon}}
                                source={require('../assets/images/heavyrain.png')}
                                style={{width:44,height:44}} />
                          <Text style={{color: 'white'}}>Monday</Text>
                          <Text style={{color: 'white',fontSize: 20,fontWeight: '600',}}>avgTemp&#176;</Text>
                        </View>

                        <View style={{backgroundColor: theme.bgWhite(0.15), display: 'flex', justifyContent: 'center',alignItems: 'center',width: 100,height:100,borderRadius: 12,paddingVertical: 12,marginBottom: 4,marginTop:10,marginRight:10}}
                        >
                            <Image 
                                // source={{uri: 'https:'+item?.day?.condition?.icon}}
                                source={require('../assets/images/heavyrain.png')}
                                style={{width:44,height:44}} />
                          <Text style={{color: 'white'}}>Monday</Text>
                          <Text style={{color: 'white',fontSize: 20,fontWeight: '600',}}>avgTemp&#176;</Text>
                        </View>

                        <View style={{backgroundColor: theme.bgWhite(0.15), display: 'flex', justifyContent: 'center',alignItems: 'center',width: 100,height:100,borderRadius: 12,paddingVertical: 12,marginBottom: 4,marginTop:10,marginRight:10}}
                        >
                            <Image 
                                // source={{uri: 'https:'+item?.day?.condition?.icon}}
                                source={require('../assets/images/heavyrain.png')}
                                style={{width:44,height:44}} />
                          <Text style={{color: 'white'}}>Monday</Text>
                          <Text style={{color: 'white',fontSize: 20,fontWeight: '600',}}>avgTemp&#176;</Text>
                        </View>
                </ScrollView>
              </View>
        </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display:'flex'
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    searchContainer: {
        height: '7%',
        marginHorizontal: 16,
        position: 'relative',
        zIndex: 50,
        marginTop:50
    },
    searchBox: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 9999,
    },
    input: {
        paddingLeft: 20,
        height: 20,
        paddingBottom: 1,
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
    },

    locationList:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        border: 'none',
        padding: 12,
        paddingHorizontal: 16,
        marginBottom: 4, 
        borderBottomWidth: 2,
        borderBottomColor: '#CBD5E0',
    }
});

export default Weather;
