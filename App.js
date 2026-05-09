import AppNavigator from './src/navigation/AppNavigator';

import { ModoSimulacaoProvider }
  from './src/context/ModoSimulacaoContext';

export default function App() {
  return (

    <ModoSimulacaoProvider>

      <AppNavigator />

    </ModoSimulacaoProvider>

  );
}
