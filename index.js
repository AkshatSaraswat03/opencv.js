const srcImg = document.getElementById('src-image');
const hiddenImg = document.getElementById('hidden-image');
const fileInput = document.getElementById('input-file');
const canvas = document.getElementById('dest-canvas');
const hiddenCanvas = document.getElementById('hidden-canvas');
let width = document.getElementById('width')
let height = document.getElementById('height')
const resizeBtn = document.getElementById('resize-btn');
const downloadBtn = document.getElementById('download-btn');


//variables to store user entered width and height
let w = null;
let h = null;

width.onchange = function () {
  w = parseInt(width.value);
}
height.onchange = function () {
  h = parseInt(height.value);
}



function convertImage(src) {
  let dst = new cv.Mat();
  let dsize = new cv.Size(w, h);
  cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);
  return dst;
}


function dataUriToBlob(dataUri) {
  const b64 = atob(dataUri.split(',')[1]);
  const u8 = Uint8Array.from(b64.split(''), e => e.charCodeAt());
  return new Blob([u8], { type: 'image/png' });
}

fileInput.addEventListener('change', e => {
  srcImg.src = URL.createObjectURL(e.target.files[0]);
  hiddenImg.src = URL.createObjectURL(e.target.files[0]);
}, false);

resizeBtn.addEventListener('click', e => {

  console.log(srcImg)

  if (w == null || h == null) {
    alert("Enter both Height and Width")
    return;
  }


  let src = cv.imread(srcImg);
  const dst = convertImage(src);
  cv.imshow('dest-canvas', dst);
  src.delete();
  dst.delete();

  let hiddenSrc = cv.imread(hiddenImg);
  const hiddenDst = convertImage(hiddenSrc);
  cv.imshow('hidden-canvas', hiddenDst);
  hiddenSrc.delete();
  hiddenDst.delete();
});


downloadBtn.addEventListener('click', e => {
  const data = hiddenCanvas.toDataURL();
  const url = URL.createObjectURL(dataUriToBlob(data));
  downloadBtn.href = url;
});