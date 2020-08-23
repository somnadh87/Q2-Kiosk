import { createContext } from 'react';

export const SuperParentContext = createContext<any>(null);
export const ParentContext = createContext<any>(null);
export const ChildContext = createContext<any>(null);