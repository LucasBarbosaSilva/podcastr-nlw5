//página que só é acessada uma vez. Fica por volta de todo o meu App.
import Document, {Html, NextScript, Main, Head} from 'next/document';


export default class MyDocument extends Document {
  render() {
    return(
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@400;500;600&display=swap" rel="stylesheet"/> 

          <link rel="shortcut icon" href="favicon.png" type="image/png"/>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
        
      </Html>
    );  
  }
}


