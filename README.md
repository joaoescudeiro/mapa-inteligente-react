# Mapa Inteligente

## 1. Visão Geral

O **Mapa Inteligente** é um aplicativo mobile desenvolvido em React Native com Expo, que permite ao usuário salvar e gerenciar locais importantes utilizando geolocalização em tempo real.

O aplicativo foi criado com foco em praticar conceitos de desenvolvimento mobile, integração com Firebase, uso de sensores do dispositivo e navegação entre telas.

Além do salvamento de locais no mapa, o sistema possui autenticação de usuários, edição de perfil, modo de simulação de localização e vibração do dispositivo ao salvar novos locais.

---

## 2. Objetivos do Projeto

- Desenvolver um aplicativo mobile funcional utilizando React Native.
- Utilizar navegação entre múltiplas telas.
- Implementar autenticação de usuários com Firebase Authentication.
- Armazenar dados em banco de dados utilizando Firebase Firestore.
- Utilizar sensores e atuadores do dispositivo.
- Criar uma interface intuitiva e organizada para o usuário.

---

## 3. Requisitos Implementados

O projeto atende aos requisitos propostos:

- Aplicativo com mais de 6 telas distintas
- Navegação utilizando Stack Navigator e Bottom Tab Navigator
- Integração com banco de dados (CRUD completo)
- Sistema de autenticação de usuários
- Uso de sensor do dispositivo (GPS)
- Uso de atuador do dispositivo (Vibração)
- Interface visual moderna e intuitiva
- Funcionalidade de simulação de localização
- Integração com mapas em tempo real

## 4. Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias, bibliotecas e ferramentas:

### Desenvolvimento Mobile
- React Native
- Expo

### Linguagem de Programação
- JavaScript

### Backend e Banco de Dados
- Firebase Authentication
- Firebase Firestore

### Mapas e Geolocalização
- react-native-maps
- expo-location

### Navegação
- @react-navigation/native
- @react-navigation/native-stack
- @react-navigation/bottom-tabs

### Interface e Ícones
- react-native
- @expo/vector-icons

### Recursos do Dispositivo
- GPS (sensor de localização)
- Vibração do dispositivo (atuador)

### Ferramentas Utilizadas
- Visual Studio Code
- Git
- GitHub
- Expo Go

### Serviços Utilizados
- Firebase Console

---

## Principais Bibliotecas Utilizadas

```bash
npm install firebase
npm install react-native-maps
npm install expo-location
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install react-native-screens
npm install react-native-safe-area-context
npm install react-native-gesture-handler
```

## 5. Funcionalidades

O aplicativo possui diversas funcionalidades voltadas para gerenciamento inteligente de locais utilizando geolocalização.

---

### Sistema de Autenticação

O app possui autenticação completa utilizando Firebase Authentication.

#### Funcionalidades:
- Cadastro de usuários
- Login de usuários
- Logout
- Validação de e-mail e senha
- Persistência de autenticação

<p align="center">
  <img
    src="assets/readme/inicio.png"
    width="250"
  />

  <img
    src="assets/readme/login.png"
    width="250"
  />

  <img
    src="assets/readme/cadastro.png"
    width="250"
  />
</p>

---

### Mapa Interativo

O usuário pode visualizar sua localização atual em um mapa em tempo real utilizando GPS.

#### Funcionalidades:
- Exibição do mapa
- Exibição da localização atual do usuário
- Centralização automática da localização
- Integração com GPS do dispositivo

---

### Salvamento de Locais

O usuário pode salvar locais diretamente no mapa.

#### Funcionalidades:
- Salvar localização atual
- Nomear locais salvos
- Armazenamento no Firebase Firestore
- Exibição dos locais salvos como marcadores no mapa

---

### Gerenciamento de Locais (CRUD)

O aplicativo possui CRUD completo para gerenciamento dos locais salvos.

#### Funcionalidades:
- Criar locais
- Listar locais salvos
- Editar nome dos locais
- Excluir locais

---

### Perfil do Usuário

O sistema possui uma tela de perfil com informações do usuário autenticado.

#### Funcionalidades:
- Exibição do nome do usuário
- Exibição do e-mail
- Edição do nome do perfil
- Logout da conta

---

### Tela de Configurações

O aplicativo possui uma área de configurações para personalização de funcionalidades.

#### Funcionalidades:
- Ativar/desativar modo simulação
- Ativar/desativar vibração
- Informações sobre o aplicativo

---

### Modo Simulação de Localização

O sistema possui um modo de simulação que permite alterar manualmente a localização no mapa sem precisar se mover fisicamente.

#### Funcionalidades:
- Simulação de localização
- Alteração manual da posição no mapa
- Marcador visual da localização simulada

---
