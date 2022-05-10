export default function(){
  function dragElement(element) {
    let drag = element.currentTarget;
    // //点击某物体时，用drag对象即可，move和up是全局区域，
    // 也就是整个文档通用，应该使用document对象而不是drag对象(否则，采用drag对象时物体只能往右方或下方移动)
    drag.onmousedown = function (event) {
      console.log(drag);
      event = event || window.event; //兼容IE浏览器
      //    鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
      // var diffX = event.clientX - drag.offsetLeft;
      var diffY = event.clientY - drag.offsetTop;
      if (typeof drag.setCapture !== "undefined") {
        drag.setCapture();
      }
      document.onmousemove = function (event) {
        event = event || window.event;
        // var moveX = event.clientX - diffX;
        var moveY = event.clientY - diffY;

        // if (moveX < 0) {
        //   moveX = 0;
        // } else if (moveX > window.innerWidth - drag.offsetWidth) {
        //   moveX = window.innerWidth - drag.offsetWidth;
        // }
        if (moveY < 120) {
          moveY = 120;
        } else if (moveY > window.innerHeight - drag.offsetHeight) {
          moveY = window.innerHeight - drag.offsetHeight;
        }
        let width = drag.clientWidth
        drag.style.position = 'absolute';
        drag.style.width = width + 'px ';
        drag.style.top = moveY + "px";
      };
      document.onmouseup = function () {
        this.onmousemove = null;
        this.onmouseup = null;
        //修复低版本ie bug
        if (typeof drag.releaseCapture != "undefined") {
          drag.releaseCapture();
        }
      };
    };
  }

  return{
    dragElement
  }
}
