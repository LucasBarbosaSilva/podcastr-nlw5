import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type } from 'node:os';
import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import style from './episode.module.scss';

type Episode = {
  id: string,
  title: string,
  members: string,
  thumbnail: string,
  publishedAt: string,
  duration: number,
  durationAsString: string,
  description: string,
  url: string
}

type EpisodeProps = {
  episode: Episode
}


export default function Episode({episode}: EpisodeProps) {
    
  return(
    <div className={style.episode}>
      <div className={style.episodeThumbnail}>
        <Link href={"/"}>
          <button>
            <img src="/arrow-left.svg" alt="Voltar"/>
          </button>
        </Link>
          
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit='cover'
        />
        <button>
          <img src="/play.svg" alt="Tocar"/>
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div className={style.description} dangerouslySetInnerHTML={ {__html: episode.description}}/>

    </div>
    
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return{
    paths: [],
    fallback: "blocking"
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await api.get(`/episodes/${ctx.params.slug}`);
  
  const episode = {
    id: data.id,
    title: data.title,
    members: data.members,
    thumbnail: data.thumbnail,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {locale: ptBR}),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url
  }

  return({
    props : {
      episode
    },
    revalidate: 60 * 60 * 24, // 24 hours
  });
}