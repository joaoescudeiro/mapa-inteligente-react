import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaInicio from '../telas/TelaInicio';
import TelaLogin from '../telas/TelaLogin';
import TelaCadastro from '../telas/TelaCadastro';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Inicio">

                <Stack.Screen name="Inicio" component={TelaInicio} />
                <Stack.Screen name="Login" component={TelaLogin} />
                <Stack.Screen name="Cadastro" component={TelaCadastro} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}