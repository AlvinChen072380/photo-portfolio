export type SceneType = 'shire' | 'rivendell' | 'mordor';

interface Scene {
  id: SceneType;
  url: string;
  alt: string;
  overlayColor: string; // 圖片載入前的底色
}

export const scenes: Record<SceneType, Scene> = {

  shire: {
    id: 'shire',
    url: '/images/backgrounds/shire.jpg',
    alt: 'Green hills of the Shire',
    overlayColor: 'bg-green-900/20'
  },
  rivendell: {
    id: 'rivendell',
    url: '/images/backgrounds/rivendell.jpg',
    alt: 'Mystical waterfall of Rivendell',
    overlayColor: 'bg-blue-900/30'
  },
  mordor: {
    id: 'mordor',
    url: '/images/backgrounds/mordor.jpg',
    alt: 'Dark mountains of Mordor',
    overlayColor: 'bg-red-950/40'
  }
};