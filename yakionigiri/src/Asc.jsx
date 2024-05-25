import './Asc.css';
import { useEffect } from 'react';
import { light, relight } from './components/Point';
import { useDispatch } from 'react-redux';
import { kaitai, toggle , hono} from './feature/ascslice';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { upDateMenseki , onigiri, yaKu } from './feature/ascslice';
import Modal from './Modal';
import Tyusyaku from './components/Tyusyaku';
import Shuku from './Shuku';
import Onigiriimg from './components/Onigiriimg';

function Asc() {
  const [sideberVisible, setSidebarVisible] = useState(false);//サイドバーのオンオフ
  const [inputText, setInputText] = useState('');//入力文字
  const [artText, setArtText] = useState('');//おにぎり本体
  const ascUser = useSelector((state) => state.asc.aori);//ascUserはstateのascのaoriを取得
  const dispatch = useDispatch();//dispatchを使うため
  const menseki = useSelector((state) => state.asc.menseki);//ascのmensekiを取得
  const onNori = useSelector((state) => state.asc.noriToggle);//ascのnoriToggleを取得
  const nori = useSelector((state) => state.asc.nori);//ascのnoriを取得
  const komeiro = useSelector((state) => state.asc.komeiro);//米色を取得
  const koutei = useSelector((state) => state.asc.koutei);//焼くと精米
  const playHono = useSelector((state) => state.asc.playhono);//動画再生
  
  const reset = async(e) => {
    await setInputText('');
    await setArtText('');
    await dispatch(kaitai());
  };
  
  const inputChange = (e) => {
    const text = e.target.value;
      setInputText(text);
      let ascArt = "";
        for (let i = 0; i < text.length; i++) {
        let subasc = Array.from({length: i+1},() => text[i]).join("");//おにぎり本体
        ascArt += subasc + "\n";
        dispatch(upDateMenseki(text.length*7,text.length*7));//のりの大きさ
      };
    setArtText(ascArt);
  };
   
  useEffect(() => {
    const mouseMove = (e) => {
      setSidebarVisible(e.clientX<window.innerWidth*0.1);//サイドバーが出てくるカーソル位置
    };
      window.addEventListener("mousemove",mouseMove);
      return() => {
      window.removeEventListener("mousemove",mouseMove);
    };
    },[]);

  const handleVideoEnd = () => {
    dispatch(hono());
    dispatch(yaKu());
  };

  useEffect(() => {
    if (playHono) {
        const video = document.getElementById("hono");
        video.play(); 
    };
    },[playHono]);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain",e.target.id);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
      const id = e.dataTransfer.getData("text");
      switch(id){
        case "yaku":
          dispatch(hono());
          break;
        case "nori":
          dispatch(onigiri());
          break;
        default:
          break;
        };
      };
  
  return (
    <div className = "App">
      <div className = 'midasi'>O☆N I G I R I</div>
        <div className = 'titlechar'>
      </div>
      <header className = "App-header">
        <pre className='OnigiriImg' style = {{color: `${komeiro}`, fontWeight: "bold"}} 
            onDrop = {handleDrop} onDragOver = {handleDragOver}>
              {artText}
              {komeiro === "#d17905" && <Shuku komeiro = {komeiro}/>} 
        </pre>
      {onNori && <Modal menseki = {menseki}/>}
      <Tyusyaku text="おにぎりを作るための文字を入力しましょう。全角と半角の組み合わせで色々な形が作れます。">
        <input 
          type = "text" 
          className = "myTextbox" 
          id = "onigiri" 
          placeholder = "文字を入れるンだ" 
          value = {inputText} 
          onChange = {inputChange} />
      </Tyusyaku>
        <p className = 'App'>
          よくきたな、まあ食べていけ！
        </p>
        <div className = 'button-container'>
          <button 
            className = 'button1' 
            onClick = {()=>{dispatch(toggle()); 
            document.getElementById('se2').play();}} >
              {ascUser}
          </button>
          <button 
            className = 'button2' 
            id = "nori" 
            onClick = {()=>{dispatch(onigiri());
            document.getElementById('se1').play();}}>
              {nori}
          </button>
        </div>
          <button
            className = 'button3' 
            id = "yaku" 
            onClick = {() => {dispatch(hono());
            document.getElementById('se3').play()}} >
              {koutei}
          </button>
          {playHono &&  <video 
            className = "button3" 
            id = "hono" 
            src = "/img/hono.mp4" 
            onEnded = {handleVideoEnd}/>}
          <p class = "btn btn-svg">
          <svg onClick = {() => {reset();document.getElementById('se4').play();}}>
            <rect  x = "2" y = "2" rx = "10" fill = "none" width = "200" height = "50">
            </rect>
          </svg>
          <span>Reset！</span>     
          </p>
        <div className = {`sidebar ${sideberVisible ? "visible" : ""}`}>
          <p className = 'sidebartext'>≫サイドメニュー</p>
          <p className = 'sidebartext' 
            onMouseOver = {() => light("onigiri")} 
            onMouseOut = {() => relight("onigiri")}>
              おにぎりを作るためのテキストを入れてみろ！
          </p>
        <img className = "img" 
             src = "/img/spdt_07.png" 
             alt = "" 
             onMouseOver = {() => light("onigiri")} 
             onMouseOut = {() => relight("onigiri")}/>
          <p className = 'sidebartext' 
            onMouseOver = {() => light("yaku")} 
            onMouseOut = {() => relight("yaku")}>
              焼くボタンでおにぎりを焼くぞ！
          </p>
        <Tyusyaku text = "焼くボタンを押すとおにぎりを焼くことができ、精米を押すと戻ります。">
        <img className = "img" 
          id = "yaku"
          src = "/img/fire_00071.jpg" 
          alt = "" onMouseOver = {() => light("yaku")} 
          onMouseOut = {() => relight("yaku")}
          draggable = "true"
          onDragStart = {handleDragStart}
        />
        </Tyusyaku>
          <p className = 'sidebartext' 
            onMouseOver = {() => light("nori")} 
            onMouseOut = {() => relight("nori")}>
              上手く海苔をつけられるかな？
          </p>
        <Tyusyaku text = "おにぎりの大きさが丁度いいと海苔をつけられます。">
          <img className = "img" 
            id = "nori"
            src = "/img/230202nori.jpg" 
            alt = "" onMouseOver = {() => light("nori")} 
            onMouseOut = {() => relight("nori")}
            draggable = "true"
            onDragStart = {handleDragStart}
          />
        </Tyusyaku>
        <p>画像ドラッグでも〇</p>
      </div>
      <div className = 'footside footside-svg'>
        <svg onClick = {Onigiriimg}>
          <rect  x = "2" y = "2" rx = "10" fill = "none" width = "200" height = "175">
          </rect>
        </svg>
        <span>組合せが大事</span>
      </div>
    </header>
      <audio id = "se1" preload = "auto">
        <source src = "/bgm/nori.mp3" type = "audio/mpeg"/>
      </audio>
      <audio id = "se2" preload = "auto">
        <source src = "/bgm/yakimasu.mp3" type = "audio/mpeg"/>
      </audio>
      <audio id = "se3" preload = "auto">
        <source src = "/bgm/norituke.mp3" type = "audio/mpeg"/>
      </audio>
      <audio id = "se4" preload = "auto">
        <source src = "/bgm/kaifuku.mp3" type = "audio/mpeg"/>
      </audio>
  </div>
  );
};
export default Asc;