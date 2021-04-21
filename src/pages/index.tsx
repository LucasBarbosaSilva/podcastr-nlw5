import {useEffect } from 'react';

export default function Home(props) {
  console.log(props.episodes);
  return (
    <>
      {props.episodes.map(episode => {
        return (
          <div>
            <h3>Título: {episode.title}</h3>
            <h4>Membros: {episode.members}</h4><br/>
          </div>
        );
      }) }
    </>
  )
}


export async function getStaticProps(){
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: { //Preciso retornar o objeto com o atributo props, foi isso que vim buscar
      episodes: data, // Aqui já pode ser qualquer nome
    },
    revalidate: 60 * 60 * 8
  };
} 