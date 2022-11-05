import Head from 'next/head'

export const Seo: React.FC = () => {
  const title = 'シンプル五目並べ'
  const description = 'NextJSで作ったとても簡単な五目並べ'
  const url = 'https://ukyoda.github.io/gomoku-narabe'
  const imageUrl = `${url}/gomoku-narabe.png`
  return (
    <Head>
      <title>{title}</title>
      <meta name='viewport' content='width=device-width,initial-scale=1.0' />
      <meta name='description' content={description} />
      <meta property="og:url" content={url} />
      <meta property='og:title' content={title} />
      <meta property='og:site_name' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta property="og:image" content={imageUrl} />
      <link rel="canonical" href={url} />
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  )
}
