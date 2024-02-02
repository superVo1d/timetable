/* @ts-ignore */
import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const proxyApi = useRuntimeConfig().proxyApi
  const path = event.path.replace(/^\/api/, '')
  const target = joinURL(proxyApi, path)

  return proxyRequest(event, target)
})
