# MyLibrum Mobile — Acervo, Mapa SENAI, Voz e Biometria

Aplicativo React Native/Expo **adaptado do projeto original** enviado pelo usuário. Mantém o login JWT e os cadastros de material, exemplar, autor, editora e gênero. Acrescenta tela de acervo, pesquisa por voz, mapa das bibliotecas SENAI/SC, login com digital e botão de logout.

## Instalar e executar no Android (Windows)

> Atenção: a base enviada usa **Expo SDK 51 (2024)**. Não utilize a versão mais recente do Expo Go (SDK atual) para abrir este projeto antigo. Para usar o reconhecimento de voz, gere a aplicação nativa pelo Android Studio.

1. Descompacte o projeto e abra **`mobile-mylibrum`** no VS Code.
2. No PowerShell, nessa pasta, execute:

```powershell
npm install
npx expo run:android
```

Isso requer **Android Studio + SDK Android + emulador** corretamente instalados. A primeira compilação gera a pasta `android/`. Com build nativo instalado, mudanças JS podem ser atualizadas usando `npx expo start --dev-client` (se instalar `expo-dev-client`) ou reexecutando `npx expo run:android`.

O projeto original **não inclui as bibliotecas nativas** necessárias, portanto a instalação do NPM é obrigatória. O `package-lock.json` antigo será atualizado pelo `npm install`; não use `npm ci` antes de atualizá-lo.

Validação TypeScript:

```powershell
npm run check
```

### Erro `Cannot find native module 'ExpoSpeechRecognition'`

O reconhecimento de voz precisa estar incluído no aplicativo Android instalado. O Expo Go não inclui esse módulo, e uma compilação nativa feita antes de adicionar a biblioteca também precisa ser recompilada.

O componente de pesquisa verifica a disponibilidade do módulo antes de carregar a biblioteca. Quando ele não está disponível, o aplicativo continua abrindo e a pesquisa digitada funciona; o botão do microfone mostra um aviso.

Depois de atualizar o código, pare o Metro com **Ctrl+C** e reinicie:

```powershell
npx expo start --clear
```

Para habilitar a pesquisa por voz, com o Android Studio/SDK configurado e um emulador aberto ou celular com depuração USB conectado, gere e instale o app nativo:

```powershell
npx expo run:android
```

Abra o **MyLibrum** instalado por esse comando. Limpar o cache ou reinstalar pacotes NPM não adiciona módulos nativos ao Expo Go.

### Conexão com a API Java

Arquivo: `src/api/api.ts`.

- **Emulador Android Studio**: `http://10.0.2.2:8184` (padrão no código, conforme `server.port` do backend MyLibrum).
- **Celular físico**: use o IP da máquina na rede, ex. `http://192.168.1.50:8184` (se firewall permitir).
- O backend precisa rodar e fornecer `POST /auth/login`, `GET /api/materiais` e `GET /api/exemplares`.
- O login envia `{email, senha}` como no ZIP original. Ajuste apenas se o backend tiver outro contrato.
- **HTTP sem TLS só é adequado para desenvolvimento local.** Para produção, configure HTTPS e autenticação real.

Para usar outro endereço, crie um arquivo `.env` na raiz do projeto (ao lado de `package.json`), substituindo o IP e a porta pelos do seu backend:

```dotenv
EXPO_PUBLIC_API_URL=http://192.168.1.50:8184
```

Sem essa variável, o app mantém o endereço padrão do emulador Android. Depois de alterar o endereço, reinicie o Metro e recarregue o aplicativo:

```powershell
npx expo start --clear
```

Se o login mostrar **"Não foi possível conectar ao servidor"**, inicie o backend Java e confirme o endereço/porta. O servidor do Expo transmite o aplicativo, mas não executa a API nem cadastra usuários. Esta pasta contém somente o aplicativo mobile; é necessário ter o projeto do backend e uma conta cadastrada nele. A tentativa de login aguarda até 10 segundos e informa separadamente falha de conexão, credenciais recusadas, acesso negado e resposta sem token.

### Google Maps: chave necessária no Android nativo

**Importante:** o mapa Android utiliza Google Maps. Em uma compilação nativa própria, configure sua chave do **Maps SDK for Android**, vinculada ao pacote `com.sgb.mobilemylibrum` e ao certificado SHA-1 de debug.

No PowerShell, antes de compilar:

```powershell
$env:GOOGLE_MAPS_API_KEY="SUA_CHAVE_MAPS_SDK_ANDROID"
npx expo run:android
```

O arquivo `app.config.js` lê essa variável e injeta em `android.config.googleMaps.apiKey` na configuração gerada, sem incluir a chave no código-fonte. A chave deve ser restringida ao app Android no Google Cloud. Se não fornecer a chave, o mapa nativo pode ficar vazio; os endereços e o botão **Traçar rota** continuarão utilizáveis.

Referência: https://docs.expo.dev/versions/latest/sdk/map-view/

### Funcionalidades

1. **Login**: via e-mail/senha na API, conforme o projeto anterior.
2. **Biometria por impressão digital**: após o primeiro login com senha, o app pergunta se deseja habilitar. Um token JWT é salvo com `expo-secure-store`. Em outro acesso, o usuário toca “Entrar com impressão digital”; o sistema pede a biometria e depois valida o token consultando o backend. Se expirou, precisa usar senha novamente. Botão para desativar em **Mais**.
3. **Logout**: botão “Sair” no cabeçalho e em **Mais**, que encerra a sessão atual removendo o token da memória. A preferência de login biométrico permanece ativada, se antes autorizada; pode ser desativada em Mais.
4. **Acervo**: mostra todos os registros devolvidos por `GET /api/materiais`; cruza com `GET /api/exemplares` para determinar se há exemplar `DISPONIVEL`. Se não houver informação de exemplares, mostra “Sem status”, sem inventar disponibilidade. Pesquisa por título/código/ISBN; filtros por tipo; detalhes em modal.
5. **Modo demonstração**: se **não houver conexão** com a API, apresenta os **7 materiais fictícios da imagem enviada**, sinalizando claramente a simulação. Não substitui uma resposta 401/403 por dados falsos. Puxe para atualizar a lista.
6. **Pesquisa por voz**: toque no microfone da busca, permita acesso ao microfone, fale “Aprendendo Java” (por exemplo) e a lista será filtrada. Usa `expo-speech-recognition@0.3.2` compatível com SDK 51. **Exige development/native build (`npx expo run:android`); não funciona apenas no Expo Go.** A disponibilidade do motor de reconhecimento pode depender dos serviços de voz instalados e da rede.
7. **Bibliotecas SENAI/SC**: mostra mapa nativo (`react-native-maps`), com marcadores de Itajaí, Balneário Camboriú, Brusque e Blumenau, lista de endereços/horários e botão **Traçar rota** (abre o Google Maps). Botão de geolocalização solicita permissão apenas ao ser utilizado. As coordenadas dos marcadores são referências de unidade; para navegação usa-se o endereço completo.
8. **Cadastros originais**: em **Cadastro** e **Mais** ficam as telas Material, Exemplar, Autor, Editora e Gênero do ZIP original.

### Limitação importante da biometria

O aplicativo só disponibiliza o login biométrico no **Android com leitor digital cadastrado e sem outros sensores biométricos (face/íris) disponíveis**, além de desabilitar a autenticação por senha/PIN no prompt (`disableDeviceFallback: true`). Isso é proposital: a API Android/Expo não oferece opção confiável para selecionar exclusivamente a digital quando há múltiplas modalidades biométricas no aparelho. **Em aparelhos com digital e face simultaneamente, o login biométrico fica bloqueado**, mas o login com senha continua disponível. Biometria local não substitui a identidade validada pelo servidor.

### Fontes do mapa

Endereços, contatos e horários oficiais: https://sc.senai.br/bibliotecas/contatos

Coordenadas de referência das unidades (cadastro escolar):
- https://www.escolasnobrasil.com/sul/senai-sc-itajai-itajai
- https://www.escolasnobrasil.com/sul/senai-sc-balneario-camboriu-balneario-camboriu
- https://www.escolasnobrasil.com/sul/senai-sc-brusque-brusque
- https://www.escolasnobrasil.com/sul/senai-sc-blumenau-blumenau

### Estrutura adicionada

```text
src/
  components/AcervoCard/
  components/PesquisaVoz/
  data/bibliotecas.ts
  data/materiaisDemo.ts
  hooks/useCatalogo.ts
  screens/acervo/AcervoScreen.tsx
  screens/bibliotecas/BibliotecasScreen.tsx
  screens/mais/MaisScreen.tsx
```

## Notas de validação

- O projeto é entregue como **código-fonte**, não APK.
- É necessário instalar as novas dependências NPM e compilar no Android Studio para verificar mapa, voz e digital em aparelho/emulador real.
- Não há credenciais reais no ZIP. A versão original não continha o backend; é necessário que a API MyLibrum esteja disponível.
