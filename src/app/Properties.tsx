export const getConfig = async () => {
  let configUrl = './public/config.json';
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    configUrl = './public/config-local.json';
  }
  try {
    const response = await fetch(configUrl); // Load from public/config.json
    if (!response.ok) {
      throw new Error('Failed to load config');
    }
    const config = await response.json();

    return config;
  } catch (error) {
    console.error('Error fetching chatbots:', error);
    throw error;
  }
};


const config = await getConfig();

const url = config.REACT_APP_BASE_URL;

if (!url) {
  throw new Error('API URL is not configured.');
}
const backendUrl = (url || 'http://localhost:8080');
const logoLightUrl = (config.LOGO_PATH_LIGHT || './images/Logo-Red_Hat-Composer_AI_Studio-A-Standard-RGB.svg');
const logoDarkUrl = (config.LOGO_PATH_DARK || './images/Logo-Red_Hat-Composer_AI_Studio-A-Reverse.svg');
console.log("logoDark: "  + logoDarkUrl + " logoLight: " + logoLightUrl);

const disableSidebar = config.DISABLE_SIDE_MENU === "true" ;

export const Properties = {
  backendUrl: backendUrl,

  chatStreamingUrl: backendUrl + '/assistant/chat/streaming',
  chatStreamingMultipartUrl: backendUrl + '/assistant/chat/streamingWithFileUpload',
  adminAssistantUrl: backendUrl + '/admin/assistant',
  knowledgeSourceUrl: backendUrl + '/admin/assistant/retrieverConnection',
  llmUrl: backendUrl + '/admin/assistant/llm',

  // TODO: Create a real auth URL that points to info on the user
  authUrl: backendUrl + '/admin/assistant',

  logoWhiteUrl: logoLightUrl,
  logoDarkUrl: logoDarkUrl,

  disableSidebar: disableSidebar
};
