import React, { createContext, useState } from 'react';

export const ModoSimulacaoContext = createContext();

export function ModoSimulacaoProvider({ children }) {
    const [modoSimulacao, setModoSimulacao] = useState(false);
    const [vibracaoAtiva, setVibracaoAtiva] = useState(true);

    return (
        <ModoSimulacaoContext.Provider value={{ modoSimulacao, setModoSimulacao, vibracaoAtiva, setVibracaoAtiva }}>
            {children}
        </ModoSimulacaoContext.Provider>
    );
}