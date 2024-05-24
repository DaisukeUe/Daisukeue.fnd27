import { createSlice } from "@reduxjs/toolkit";
  const initialState = {
    textToggle: false,
    noriToggle: false,
    aori: "ここをクリックしてみろ",    //初期値設定
    nori: "にぎりが出来たらここを押せ！",
    menseki: {tate:0,
              yoko:0,
             },
    yaketa: false,
    komeiro: "#ffffff",
    koutei: "焼く",
    playhono: false,
    shuku: false,
};

export const ascslice = createSlice({
  name: "asc",
  initialState,
  reducers: {
    toggle: (state) => {
      state.textToggle = !state.textToggle;  //いたずらぼたん
        if (state.textToggle) {
          state.aori = "なんにもおこりません（笑）";
        } else {
          state.aori = "ここをクリックしてみろ";
        }},
      
    onigiri: (state) => {
      if (state.menseki.tate <=250) {
        state.nori = "小さすぎるぞ！びびるな！";
        state.noriToggle = false;
        } else if (state.menseki.tate >= 300){
          state.nori = "デカすぎる！遠慮をまなべ！";
          state.noriToggle = false;
        } else {
          state.noriToggle = !state.noriToggle;
        if (state.noriToggle) {
          state.nori = "おにぎりができたよ！";
        } else {
          state.nori = "にぎりが出来たらここを押せ！";  
        };
      };
    },
      
    upDateMenseki: (state,action) => {
      state.menseki.tate = action.payload;
      state.menseki.yoko = action.payload;
    },

    yaKu: (state) => {
      state.yaketa = !state.yaketa;
        if (state.yaketa) {
          state.komeiro = "#d17905";
          state.koutei = "精米";
        } else {
          state.komeiro = "#ffffff";
          state.koutei = "焼く";
        };
      },

    hono: (state) => {
      if(state.komeiro !== "#d17905") {
        state.playhono = !state.playhono;
          } else {
            state.komeiro = "#ffffff";
            state.koutei = "焼く";
          };
        },

    kaitai: (state) => {
      state.menseki.tate = 0;
      state.menseki.yoko = 0;
      state.noriToggle = false;
      state.nori = "にぎりが出来たらここを押せ！";
      state.komeiro = "#ffffff";
      state.koutei = "焼く";
      state.yaketa = false;
      state.playhono = false;
      state.textToggle = false;
      state.aori = "ここをクリックしてみろ";
    },

    iwai: (state) => {
      state.shuku = !state.shuku;
    },
}});

export const {toggle, onigiri, upDateMenseki, yaKu, kaitai, hono, iwai} = ascslice.actions;
export default ascslice.reducer;