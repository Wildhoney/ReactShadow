import browserEnv from 'browser-env';

browserEnv(['window', 'document', 'navigator', 'requestAnimationFrame']);
global.requestAnimationFrame = cb => cb();
