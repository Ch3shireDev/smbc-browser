import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'SMBC',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
        launchShowDuration: 3000,
        launchAutoHide: false,
        backgroundColor: '#ffffffff',
        androidSplashResourceName: 'splash',
        androidScaleType: 'CENTER_CROP',
        showSpinner: false,
        splashFullScreen: false,
        splashImmersive: false,
    },
},
};

export default config;
