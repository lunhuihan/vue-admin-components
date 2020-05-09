exports.createVersion = (version) => {
  const versionArr = version.split('.')
  function addVersion(versionArr, position = versionArr.length - 1) {
    position = position >= 0 ? position : 0
    let nextVersion = Number(versionArr[position]) + 1
    if (nextVersion > 999) {
      versionArr[position] = 0
      return addVersion(versionArr, position - 1)
    } else {
      return {
        position,
        nextVersion
      }
    }
  }
  const { position, nextVersion } = addVersion(versionArr)
  versionArr[position] = nextVersion.toString()
  return versionArr.join('.')
}