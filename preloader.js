export function preloader(params) {
  const { onChange } = params;
  let mediaNodes = [
      ...Array.from(document.images),
      ...Array.from(document.getElementsByTagName('video')),
    ],
    mediaLength = mediaNodes.length,
    countLoaded = 0;

  for (let node of mediaNodes) {
    let isComplete = false;
    let action = "";

    if(node instanceof HTMLImageElement) {
      isComplete = node.complete;
      action = "load";
    } else if(node instanceof HTMLVideoElement) {
      isComplete = !!node.duration;
      action = "canplay";
    }

    if(isComplete) {
      onChange(++countLoaded, false);
      continue;
    }

    node.addEventListener(action, onLoad);
  }
  
  function onLoad(this) {
    if(this.getAttribute("data-loaded")) {
      return;
    }
    this.setAttribute("data-loaded", "");
    ++countLoaded
    let percentage = (countLoaded / mediaLength) * 100;
    let complete = percentage === 100;
    onChange(percentage, complete);
  }
}
