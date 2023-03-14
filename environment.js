

const ENV = {
  development: {
    
    FIREBASE_WEB_CLIENT_ID: '478430295721-oiuh4coudrj98km8ie77clj4pfrntets.apps.googleusercontent.com',
    FIREBASE_ANDROID_CLIENT_ID: '478430295721-ss8jqrctch589d1tmbm800uv2oahm4r0.apps.googleusercontent.com'
  },
  production: {
    FIREBASE_WEB_CLIENT_ID: '478430295721-oiuh4coudrj98km8ie77clj4pfrntets.apps.googleusercontent.com',
    FIREBASE_ANDROID_CLIENT_ID: '478430295721-ss8jqrctch589d1tmbm800uv2oahm4r0.apps.googleusercontent.com'
  }
}

const getEnvVars = () => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    console.log('running in dev mode');
    return ENV.development;
  }
    return ENV.production;
 };
 
 export default getEnvVars;