import html2canvas from "html2canvas";

const Onigiriimg = async() => {
    const options = {
      backgroundColor: 'black', 
      scale: 2, 
      logging: true, 
      useCORS: true, 
      };
    const onigiriElem = document.querySelector(".OnigiriImg");
    if (!onigiriElem) {
      console.error('.OnigiriImgはございません');
      return;
    };
  html2canvas(onigiriElem ,options).then(canvas => {
  const nigiriUrl = canvas.toDataURL("image/png");
  const onigilink = document.createElement("a");
    onigilink.href = nigiriUrl;
    onigilink.download = "onigiri.png";
    onigilink.click();
});
};

export default Onigiriimg;
