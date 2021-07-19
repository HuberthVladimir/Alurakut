import { useState, useEffect } from 'react'
import { MainGrid } from '../components/MainGrid'
import { Box } from '../components/Box'
import { ProfileRelationsBoxWrapper } from '../components/Box/ProfileRelations'
import { ProfileSidebar } from '../components/Box/ProfileSideBar'

import nookies from 'nookies'
import jwt from 'jsonwebtoken'

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

export default function Home(props) {

  const [comunities, setComunities] = useState([])
  const [followers, setFollowers] = useState([])

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((response) => response.json())
      .then((dataResponse) => setFollowers(dataResponse))

    //api GraphQL
    fetch('https://graphQl.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'e4f45f862dffeb426ba555390d45ba',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query 
        {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
          }
        }
      `})
    })
      .then((response) => response.json())
      .then((response) => setComunities(response.data.allCommunities))

  }, [])

  const githubUser = props.githubUser
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
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <aside className="profileArea">
          <ProfileSidebar imgUser={githubUser} />
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

              console.log(dataForm.get('image'))

              const dataComunity = {
                title: dataForm.get('title'),
                imageUrl: dataForm.get('image'),
                creatorSlug: githubUser
              }

              fetch('/api/comunities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataComunity)
              })
                .then(async (response) => {
                  const responseJson = await response.json()
                  const comunity = responseJson.registerComunities
                  const activesComunity = [...comunities, comunity]
                  setComunities(activesComunity)
                })

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
                  placeholder="Coloque um URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque um URL para usarmos de capa"
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
              {comunities.map((value) => {
                return (
                  <li key={value.id}>
                    <a href={`/comunities/${value.id}`} >
                      <img src={value.imageUrl} alt={value.title + 'pic'} />
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

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const token = cookies.USER_TOKEN;
  const decodedToken = jwt.decode(token);
  const githubUser = decodedToken?.githubUser;

  if (!githubUser) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  // const followers = await fetch(`https://api.github.com/users/${githubUser}/followers`)
  //   .then((res) => res.json())
  //   .then(followers => followers.map((follower) => ({
  //     id: follower.id,
  //     name: follower.login,
  //     image: follower.avatar_url,
  //   })));

  return {
    props: {
      githubUser,
    }
  }
}