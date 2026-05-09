import React, { createContext, useState } from 'react';

export const ModoSimulacaoContext = createContext();

export function ModoSimulacaoProvider({ children }) {
    const [modoSimulacao, setModoSimulacao] = useState(false);

    return (
        <ModoSimulacaoContext.Provider
            value={{
                modoSimulacao,
                setModoSimulacao
            }}
        >
            {children}
        </ModoSimulacaoContext.Provider>
    );
}