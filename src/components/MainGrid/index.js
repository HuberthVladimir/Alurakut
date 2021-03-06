import styled from 'styled-components'

export const MainGrid = styled.main`
  width: 100%;
  display: grid;
  gap: 10px;
  margin: 0 auto;
  max-width: 500px;
  padding: 16px;

  .profileArea {
    display: none;
    @media(min-width: 860px) {
      display: block;
    }
  }

  @media(min-width: 860px) {
    max-width: 1110px;
    grid-template-areas: "profileArea welcomeArea profileRelationsArea";
    grid-template-columns: 160px 1fr 312px;
  }
`