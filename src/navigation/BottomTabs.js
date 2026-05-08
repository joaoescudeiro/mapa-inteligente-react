import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TelaMapa from '../telas/TelaMapa';
import TelaLocais from '../telas/TelaLocais';
import TelaPerfil from '../telas/TelaPerfil';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {

    return (
        <Tab.Navigator>

            <Tab.Screen
                name="Mapa"
                component={TelaMapa}
            />

            <Tab.Screen
                name="Locais"
                component={TelaLocais}
            />

            <Tab.Screen
                name="Perfil"
                component={TelaPerfil}
            />

        </Tab.Navigator>
    );
}