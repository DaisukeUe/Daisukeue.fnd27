function light(id) {
  const ele = document.getElementById(id);
    if (ele) {
      ele.classList.add('highlight');
    };
  };
  
function relight(id) {
  const ele = document.getElementById(id);
    if (ele) {
      ele.classList.remove('highlight');
    };
  };
export { light };
export { relight };