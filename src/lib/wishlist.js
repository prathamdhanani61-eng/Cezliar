'use client';

import { useCallback, useSyncExternalStore } from 'react';

// The wishlist lives in this browser only (localStorage); there are no accounts.
const STORAGE_KEY = 'cezliar-wishlist';
const CHANGE_EVENT = 'cezliar-wishlist-change';
const EMPTY = [];

let lastRaw = null;
let lastIds = EMPTY;

const readRaw = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const getSnapshot = () => {
  const raw = readRaw();
  if (raw !== lastRaw) {
    lastRaw = raw;
    try {
      const parsed = JSON.parse(raw || '[]');
      lastIds = Array.isArray(parsed) ? parsed : EMPTY;
    } catch {
      lastIds = EMPTY;
    }
  }
  return lastIds;
};

const subscribe = (callback) => {
  window.addEventListener('storage', callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
};

export function useWishlist() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);

  const toggle = useCallback((id) => {
    const current = getSnapshot();
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      return;
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { ids, toggle, has: (id) => ids.includes(id) };
}
