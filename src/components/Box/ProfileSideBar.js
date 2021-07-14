import { AlurakutProfileSidebarMenuDefault } from '../../lib'
import { Box } from '.'

export function ProfileSidebar(props) {
   return (
      <Box>
         <img src={`https://github.com/${props.imgUser}.png`} style={{ borderRadius: '8px' }} />
         <hr />
         <p>
            <a className="boxLink" href={`https://github.com/${props.imgUser}`}>
               @{props.imgUser}
            </a>
         </p>
         <hr />

         <AlurakutProfileSidebarMenuDefault />
      </Box>
   )
}