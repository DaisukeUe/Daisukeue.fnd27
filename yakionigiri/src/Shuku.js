import React from 'react'
import './Shuku.css';
import { useEffect , useState} from 'react';
import { useSelector } from 'react-redux';


const Shuku = () => {
const yaketa = useSelector((state) => state.asc.yaketa);
const [isShown, setIsShown] = useState(true);
  if (yaketa === false) setIsShown(false);
    useEffect(() => {
      if (isShown) {
        document.getElementById('se5').play();
      }
}, [isShown]);
    
  return (
    <div className = 'shuku'>
      <img src = "/img/suzu.gif" alt = "description of gif" />   
        <audio id = "se5" preload = "auto">
          <source src = "/bgm/hakushu.mp3" type = "audio/mpeg"/>
        </audio>
      </div>
    );
  };
export default Shuku;