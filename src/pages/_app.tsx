import '../styles/globals.scss';
import type { AppProps } from 'next/app';

import { PointProvider } from '../hooks/usePoint';
import { UserProvider } from '../hooks/useUser';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PointProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </PointProvider>
  );
}

export default MyApp;
