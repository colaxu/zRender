require.config({
  baseUrl: 'utils/zrender',
  paths: {
    'zrender': 'zrender'
  }
})

require(
['zrender', 'shape/Circle', 'tool/color', 'shape/Image', 'shape/Rectangle'],
function (zrender) {
  const zr = zrender.init(document.getElementById('main'))
  const ImageShape = require('shape/Image')
  const height = Math.ceil(zr.getHeight())
  const zrWidth = Math.ceil(zr.getWidth())
  const frameNum = 30
  let image = null
  const RectangleShape = require('shape/Rectangle')

  getImgInfo(height, './images/1.jpg')
  .then(({width, imgWidth, imgHeight}) => {
    image = new ImageShape({
      style: {
        image: './images/1.jpg',
        x: 0,
        y: 0,
        height,
        width,
        sx: 0,
        sy: 0,
        sWidth: imgWidth,
        sHeight: imgHeight
      },
      hoverable: false,
      clickable: true,
      onclick: function () {
        console.log(1)
      }
    })
    zr.addShape(image)
    zr.render(function () {
      const imgTimer = setInterval(() => {
        image.style.sx += 2
        if (image.style.sx >= imgWidth - imgWidth / width * zrWidth) clearInterval(imgTimer)
        zr.modShape(image.id, image)
        zr.refresh()
      }, 1e3 / frameNum)
    })
  })
  window.addEventListener('resize', () => {
    zr.resize()
  })
}
)
