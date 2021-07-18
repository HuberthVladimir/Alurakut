import { SiteClient } from 'datocms-client'

export default async function requestReceiver(request, response) {
   if (request.method === 'POST') {
      const client = new SiteClient(process.env.TOKEN_CMS)

      const registerComunities = await client.items.create({
         itemType: "971620",
         ...request.body,
      })

      response.json({
         data: 'data',
         registerComunities: registerComunities
      })
      return
   }

   response.status(404).json({
      message: 'Get has empty'
   })
}