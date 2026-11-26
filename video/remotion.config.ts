import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// Sessiz video: ses kanalı eklenmez.
Config.setMuted(true);
