import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../theme/theme';
import { fetchLocations, fetchWeatherForecast } from '../api/weather';
import * as Progress from 'react-native-progress';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import {MapPinIcon,CalendarDaysIcon} from 'react-native-heroicons/solid'
import { debounce } from "lodash";
import { weatherImages } from '../constants/constants';


const Weather = () => {
    const [showSearch,toggleSearch] = useState(false);
    const [locations,setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [weather, setWeather] = useState({})

    const handleSearch = search=>{
        if(search && search.length>2)
        fetchLocations({cityName: search}).then(data=>{
          console.log('got locations: ',data);
          setLocations(data);
        })
    }

    const handleLocation = (loc)=>{
        setLoading(true);
        toggleSearch(false);
        setLocations([]);
        fetchWeatherForecast({
          cityName: loc.name,
          days: '7'
        }).then(data=>{
          setLoading(false);
          setWeather(data);
          storeData('city',loc.name);
        })
      }

      useEffect(()=>{
        fetchMyWeatherData();
      },[]);
    
      const fetchMyWeatherData = async ()=>{
        // let myCity = await getData('city');
        // let cityName = 'Colombo';
        // if(myCity){
        //   cityName = myCity;
        // }
        fetchWeatherForecast({
          cityName:'Colombo',
          days: '7'
        }).then(data=>{
          // console.log('got data: ',data.forecast.forecastday);
          setWeather(data);
          setLoading(false);
        })
        
      }
    
    
    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
    const {location, current} = weather;

    return (
        <View style={styles.mainContainer}>
            <StatusBar style='light' />
            <Image
                blurRadius={70}
                source={require('../assets/images/bg.png')}
                style={styles.backgroundImage}
            />
            {
          loading? (
            <View style={styles.circleSnail} className="">
              <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
            </View>
          ):(
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={[styles.searchBox, {backgroundColor: showSearch?theme.bgWhite(0.2):'transparent'},]}>
                {
                    showSearch? (
                        <TextInput
                        onChangeText={handleTextDebounce}
                        placeholder='Search city'
                        placeholderTextColor='lightgray'
                        style={styles.input}
                    />
                    ):null
                }
                    <TouchableOpacity style={[styles.magnifyingGlassIcon,{backgroundColor:theme.bgWhite(0.3)}]} onPress={()=>{toggleSearch(!showSearch)}}>
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
                                            <Text style={styles.locationName}>{loc?.name}, {loc?.country}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    ):null
                }
            </View>

            {/* Forcast  */}

                <View style={styles.forcastContainer}>
                    <Text style={styles.forecastName}>{location?.name},
                        <Text style={styles.forcastLoaction}>{location?.country}</Text>
                    </Text>

                    {/* Weather image */}
                    <View style={styles.weatherImageContainer}>
                        <Image source={weatherImages[current?.condition?.text || 'other']} style={styles.weatherImage}/>
                    </View>

                    {/* Degree celcius */}
                    <View style={styles.degree}>
                        <Text style={styles.temperature}>
                        {current?.temp_c}&#176;</Text>
                        <Text style={styles.weatherCondition}>
                        {current?.condition?.text}</Text>
                    </View>

                    {/* other status */}
                    <View style={styles.weatherStatusContainer}>
                        <View style={styles.weatherStatus}>
                            <Image source={require('../assets/icons/wind.png')} style={styles.weatherStatusImage}/>
                            <Text style={styles.weatherStatusText}> {current?.wind_kph}km</Text>
                        </View>
                        <View style={styles.weatherStatus}>
                            <Image source={require('../assets/icons/drop.png')} style={styles.weatherStatusImage} />
                            <Text style={styles.weatherStatusText}> {current?.humidity}%</Text>
                        </View>
                        <View style={styles.weatherStatus}>
                            <Image source={require('../assets/icons/sun.png')} style={styles.weatherStatusImage} />
                            <Text style={styles.weatherStatusText}> { weather?.forecast?.forecastday[0]?.astro?.sunrise }
                            </Text>
                        </View>
                  
                    </View>
                </View>

                    {/* Forcast for next days */}

              <View style={styles.forcastNextDaysContainer}>
                <View style={styles.calenderDays}>
                  <CalendarDaysIcon size="22" color="white" />
                  <Text style={styles.calenderDaysText}>Daily forecast</Text>
                </View>

                <ScrollView horizontal contentContainerStyle={{paddingHorizontal: 15}} showsHorizontalScrollIndicator={false}>
                 {
                    weather?.forecast?.forecastday?.map((item,index)=>{
                      const date = new Date(item.date);
                      const options = { weekday: 'long' };
                      let dayName = date.toLocaleDateString('en-US', options);
                      dayName = dayName.split(',')[0];

                      return (
                        <View key={index} style={[styles.followingDays,{backgroundColor: theme.bgWhite(0.15)}]}
                        >
                            <Image 
                                source={weatherImages[item?.day?.condition?.text || 'other']}
                                style={styles.followingDaysImage} />
                          <Text style={styles.daysName}>{dayName}</Text>
                          <Text style={styles.daysTemp}>{item?.day?.avgtemp_c}&#176;</Text>
                        </View>
                        )
                    })
                 }
                </ScrollView>
              </View>
        </SafeAreaView>
          )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    
    mainContainer:{
        flex:1,
        position: 'relative'
    },
    circleSnail:{
        flex:1, 
        flexDirection:'row',
        justifyContent:'center',
         alignItems:'center'
    },
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
    magnifyingGlassIcon:{
        borderRadius:50,
        padding: 12,
        margin: 6
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
    },
    locationName:{
        color:'black',
        fontSize: 18,
        marginLeft: 8
    },
    forcastContainer:{
        marginHorizontal: 16,
        display: 'flex',
        justifyContent: 'space-around',
        flex: 1,
        marginBottom: 8
    },
    forecastName:{
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    },
    forcastLoaction:{
        fontSize: 18,
        fontWeight: '600',
        color: '#D1D5DB',
    },
    weatherImageContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    weatherImage:{
        width: 200,
        height:200
    },
    degree:{
        marginVertical: 8,
    },
    temperature:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 48,
        marginLeft: 20
    },
    weatherCondition:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        letterSpacing:2
    },
    weatherStatusContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 16,
        marginRight: 16,
    },
    weatherStatus:{
        flexDirection: 'row',
        marginHorizontal: 2,
        alignItems: 'center'
    },
    weatherStatusImage:{
        width: 24,
        height:24
    },
    weatherStatusText:{
        color: 'white',
        fontWeight: '600',
        fontSize: 16
    },
    forcastNextDaysContainer:{
        marginBottom: 8,
        marginTop: 12,
        marginTop: 16
    },
    calenderDays:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    calenderDaysText:{
        color: 'white',
        fontSize: 16,
        paddingLeft:10
    },
    followingDays:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height:100,
        borderRadius: 12,
        paddingVertical: 12,
        marginBottom: 4,
        marginTop:10,
        marginRight:10
    },
    followingDaysImage:{
        width:44,
        height:44
    },
    daysName:{
        color: 'white'
    },
    daysTemp:{
        color: 'white',
        fontSize: 20,
        fontWeight: '600'
    }

});

export default Weather;
