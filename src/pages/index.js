import { useState, useEffect } from 'react'
import { MainGrid } from '../components/MainGrid'
import { Box } from '../components/Box'
import { ProfileRelationsBoxWrapper } from '../components/Box/ProfileRelations'
import { ProfileSidebar } from '../components/Box/ProfileSideBar'

import { AlurakutMenu, OrkutNostalgicIconSet } from '../lib'

const ProfileRelationsBox = (props) => {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>

      <ul>
        {props.items.map((value) => {
          return (
            <li key={value.id}>
              <a href={value.html_url} >
                <img src={`https://github.com/${value.login}.png`} alt={'user pic'} />
                <span>{value.login}</span>
              </a>
            </li>
          )

        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {

  const [comunities, setComunities] = useState([{
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }])


  const [followers, setFollowers] = useState([])
  useEffect(() => {
    fetch(`https://api.github.com/users/${githubuser}/followers`)
      .then((response) => response.json())
      .then((dataResponse) => setFollowers(dataResponse))
  }, [])

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
      <AlurakutMenu githubUser={githubuser} />
      <MainGrid>
        <aside className="profileArea">
          <ProfileSidebar imgUser={githubuser} />
        </aside>

        <section className="welcomeArea">
          <Box>
            <h1 className="title">Bem Vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja Fazer?</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const dataForm = new FormData(e.target)
              const dataComunity = {
                title: dataForm.get('title'),
                image: dataForm.get('image')
              }
              const activesComunity = [...comunities, dataComunity]
              setComunities(activesComunity)
            }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>

              <div>
                <input
                  placeholder="Coloque um URL para usarmos de capa?"
                  name="title"
                  aria-label="Coloque um URL para usarmos de capa?"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </section>

        <aside className="profileRelationsArea">
          <ProfileRelationsBox title='followers' items={followers} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunities.length})
            </h2>
            <ul>
              {comunities.map((value, index) => {
                return (
                  <li key={index}>
                    <a href={`/users/${value.title}`} >
                      <img src={value.image} alt={value.title + 'pic'} />
                      <span>{value.title}</span>
                    </a>
                  </li>
                )

              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoritePersons.length})
            </h2>

            <ul>
              {[
                'juunegreiros',
                'omariosouto',
                'peas',
                'rafaballerini',
                'marcobrunodev',
                'felipefialho'
              ].map((value) => {
                return (
                  <li key={value}>
                    <a href={`/users/${value}`} >
                      <img src={`https://github.com/${value}.png`} alt={value + 'pic'} />
                      <span>{value}</span>
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
