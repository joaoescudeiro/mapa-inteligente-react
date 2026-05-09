import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import TelaMapa from '../telas/TelaMapa';
import TelaLocais from '../telas/TelaLocais';
import TelaPerfil from '../telas/TelaPerfil';
import TelaConfiguracoes from '../telas/TelaConfiguracoes';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Mapa') {
                    iconName = 'map';
                }
                else if (route.name === 'Locais') {
                    iconName = 'location';
                }
                else if (route.name === 'Perfil') {
                    iconName = 'person';
                }
                else if (route.name === 'Configurações') {
                    iconName = 'settings';
                }
                return (
                    <Ionicons
                        name={iconName}
                        size={size}
                        color={color}
                    />
                );
            },
            tabBarActiveTintColor: '#3060ff',
            tabBarInactiveTintColor: 'gray',
        })}>

            <Tab.Screen name="Mapa" component={TelaMapa} />
            <Tab.Screen name="Locais" component={TelaLocais} />
            <Tab.Screen name="Perfil" component={TelaPerfil} />
            <Tab.Screen name="Configurações" component={TelaConfiguracoes} />

        </Tab.Navigator>
    );
}