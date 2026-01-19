'use client'

import { useRef, useEffect } from "react";
import { useLikesStore } from "../store/useLikesStores";

export default function StoreInitializer() {
  const initialized = useRef(false);
  const initLikes = useLikesStore((state) => state.initLikes);

  useEffect(() => {
    if (!initialized.current) {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('photo_likes_store');
        if (stored) {
          try {
            initLikes(JSON.parse(stored));
          } catch (e) {
            console.error('Failed to parse likes', e);
          }
        }
      }
      initialized.current = true;
    }
  }, [initLikes]);

  return null;
}