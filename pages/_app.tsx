import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <div className="w-full h-full top-0 bottom-0 bg-slate-500">
        <Component {...pageProps} />
      </div>
    </CookiesProvider>
  );
}

export default MyApp;
