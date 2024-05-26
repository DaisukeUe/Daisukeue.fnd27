import React from 'react'

const Modal = ({menseki}) => {
const {tate,yoko} = menseki;
 const height = tate||200;
 const width = yoko||200;


  return (
    <div style = {{ width: `${width}px`,
                  height: `${height}px`,
                  backgroundColor: "black",
                  position:'absolute',
                  top: "54%",
                  left: "51%",
                  transform: "translate(-25%,-50%)",
                  zIndex: 1000,
                  color: "white",
                  textAlign: "center",
                  fontSize: "30px",
                  borderRadius: "10px",
                 }}>
                  <img src = "/img/nori.jpg" alt = "" 
                       style = {{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "10px",
                       }}/></div>
  )
}

export default Modal;