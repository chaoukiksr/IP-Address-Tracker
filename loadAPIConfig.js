const loadAPIConfig = async () => {
   let APICONFIG
   try {
      let response = await fetch('./APICONFIG.json')
      APICONFIG = await response.json()
      return  APICONFIG
   } catch (error) {
      console.log(error)
   }
}
export default loadAPIConfig