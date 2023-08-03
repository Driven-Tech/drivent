import { createContext, useState, useContext } from 'react';

const SubscriptionContext = createContext();

export function useSubscription() {
  return useContext(SubscriptionContext); 
}

export function SubscriptionProvider({ children }) {
  const [hasNewData, setHasNewData] = useState(false);

  return (
    <SubscriptionContext.Provider value={{ hasNewData, setHasNewData }}>
      {children}
    </SubscriptionContext.Provider>
  );
}
