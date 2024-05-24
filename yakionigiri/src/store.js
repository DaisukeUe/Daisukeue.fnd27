import {configureStore} from '@reduxjs/toolkit';
import ascslice from './feature/ascslice';

export const store = configureStore({
  reducer: {
    asc: ascslice,
  }
 });

//リデューサーをとうろく