function getImgInfo (height, url) {
  const img = new Image()
  img.src = url
  return new Promise((resolve, reject) => {
    img.onload = () => {
      const width = Math.ceil(img.width * height / img.height)
      resolve({width, imgWidth: img.width, imgHeight: img.height})
    }
    img.onerror = (err) => {
      reject(err)
    }
  })
}
