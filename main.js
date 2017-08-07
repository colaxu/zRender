require.config({
  baseUrl: 'utils/zrender',
  paths: {
    'zrender': 'zrender'
  }
})

require(
['zrender', 'shape/Image'],
function (zrender) {
  const zr = zrender.init(document.getElementById('main'))
  const ImageShape = require('shape/Image')
  const height = Math.ceil(zr.getHeight())
  const zrWidth = Math.ceil(zr.getWidth())
  const frameNum = 60
  let imgTimer = null
  let image = null

  getImgInfo(height, './images/1.jpg')
  .then(({width, imgWidth, imgHeight}) => {
    let flag = false
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
      onclick () {
        if (!flag) clearInterval(imgTimer)
        else startTimer({width, imgWidth, imgHeight})
        flag = !flag
      }
    })
    zr.addShape(image)
    zr.render(() => {
      startTimer({width, imgWidth, imgHeight})
    })
  })
  window.addEventListener('resize', () => {
    zr.resize()
  })

  function startTimer ({width, imgWidth, imgHeight}) {
    imgTimer = setInterval(() => {
      image.style.sx += 1
      if (image.style.sx >= imgWidth - imgWidth / width * zrWidth) clearInterval(imgTimer)
      zr.modShape(image.id, image)
      zr.refresh()
    }, 1e3 / frameNum)
  }
}
)
