import { MainGrid } from '../components/MainGrid'
import { Box } from '../components/Box'
import { ProfileRelationsBoxWrapper } from '../components/Box/ProfileRelations'
import { ProfileSidebar } from '../components/Box/ProfileSideBar'

import { AlurakutMenu, OrkutNostalgicIconSet } from '../lib'

export default function Home() {
  const githubuser = 'huberthvladimir'
  const favoritePersons = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  return (
    <>
      <AlurakutMenu githubuser={githubuser} />
      <MainGrid>
        <aside className="profileArea">
          <ProfileSidebar imgUser={githubuser} />
        </aside>

        <section className="welcomeArea">
          <Box>
            <h1 className="title">Bem Vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>
        </section>

        <aside className="profileRelationsArea">
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({favoritePersons.length})
            </h2>

            <ul>
              {favoritePersons.map((valor) => {
                return (
                  <li key={valor}>
                    <a href={`/users/${valor}`} >
                      <img src={`https://github.com/${valor}.png`} alt={valor + 'pic'} />
                      <span>{valor}</span>
                    </a>
                  </li>
                )

              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </aside>
      </MainGrid>
    </>
  )
}
