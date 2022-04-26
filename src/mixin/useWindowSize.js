export default function () {
  function getscreenSize() {
    let screenSize = "big";
    if (window.matchMedia("(max-width: 800px)").matches) {
      screenSize = "small";
    } else {
      screenSize = "big";
    }
    return screenSize;
  }

  return {
    getscreenSize,
  };
}
