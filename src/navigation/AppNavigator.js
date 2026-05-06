import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaInicio from '../telas/TelaInicio';
import TelaLogin from '../telas/TelaLogin';
import TelaCadastro from '../telas/TelaCadastro';
import TelaPrincipal from '../telas/TelaPrincipal';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Inicio">

                <Stack.Screen name="Inicio" component={TelaInicio} options={{
                    headerBackVisible: false
                }} />
                <Stack.Screen name="Login" component={TelaLogin} />
                <Stack.Screen name="Cadastro" component={TelaCadastro} />
                <Stack.Screen name="Principal" component={TelaPrincipal} options={{
                    headerBackVisible: false
                }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}