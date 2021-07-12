import { Box } from '.'

export function ProfileSidebar(props) {
   return (
      <Box>
         <img src={`https://github.com/${props.imgUser}.png`} style={{ borderRadius: '8px' }} />
      </Box>
   )
}