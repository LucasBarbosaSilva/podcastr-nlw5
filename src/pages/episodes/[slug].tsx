import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { usePlayer } from '../../contexts/PlayerContext';
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
  const { play } = usePlayer();
  return(
    <div className={style.content}>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>
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
            <img src="/play.svg" alt="Tocar" onClick={() => play(episode)}/>
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
    </div>
    
    
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {data} = await api.get("episodes", {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const paths = data.map((episode) => {
    return{
      params: {
        slug: episode.id,
      }
    }
  });

  return{
    paths,
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