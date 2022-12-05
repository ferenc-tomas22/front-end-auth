import React from 'react';

export default function createFastContext<Store>(initialState: Store) {
  function useStoreData(): {
    get: () => Store;
    set: (value: Partial<Store>) => void;
    subscribe: (callback: () => void) => () => void;
  } {
    const store = React.useRef(initialState);

    const get = React.useCallback(() => store.current, []);

    const subscribers = React.useRef(new Set<() => void>());

    const set = React.useCallback((value: Partial<Store>) => {
      store.current = { ...store.current, ...value };
      for (const callback of subscribers.current) callback();
    }, []);

    const subscribe = React.useCallback((callback: () => void) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  }

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

  const StoreContext = React.createContext<UseStoreDataReturnType | null>(null);

  function Provider({ children }: { children: React.ReactNode }) {
    return <StoreContext.Provider value={useStoreData()}>{children}</StoreContext.Provider>;
  }

  function useStore<SelectorOutput>(
    selector: (store: Store) => SelectorOutput
  ): [SelectorOutput, (value: Partial<Store>) => void] {
    const store = React.useContext(StoreContext);

    if (!store) {
      throw new Error('Store not found');
    }

    const state = React.useSyncExternalStore(store.subscribe, () => selector(store.get()));

    return [state, store.set];
  }

  return {
    Provider,
    useStore,
  };
}
