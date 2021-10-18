import { useMediaQuery } from '@chakra-ui/react'
import { useEffect } from 'react'

const Crisp = () => {
  const [isLargerThan400] = useMediaQuery('(min-width: 400px)')

  useEffect(() => {
    // Include the Crisp code here, without the <script></script> tags
    window.$crisp = []
    window.CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID

    if (isLargerThan400) {
      const d = document
      const s = d.createElement('script')
      s.src = 'https://client.crisp.chat/l.js'
      s.async = 1
      d.getElementsByTagName('head')[0].appendChild(s)
    }
  }, [])

  // useEffect(() => {
  //   const cmd = `chat:${isLargerThan400 ? 'show' : 'hide'}`
  //   if (window && window.$crisp) {
  //     window.$crisp.push(['do', cmd])
  //   }
  //   return () => {
  //     if (window && window.$crisp) {
  //       window.$crisp.push(['do', 'chat:show'])
  //     }
  //   }
  // }, [isLargerThan400])

  return null
}

export default Crisp
