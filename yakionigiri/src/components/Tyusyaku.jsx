import React, { useState } from "react";
import "./tyusyaku.css";

const Tyushaku = ({ children, text }) => {
  const [visible, setVisible] = useState(false);
      return (
      <div onMouseOver = {() => setVisible(true)} 
           onMouseOut = {() => setVisible(false)}>
        {children}
        {visible && <div className = "tyusyaku">{text}</div>}
      </div>
    );
  };
export default Tyushaku;