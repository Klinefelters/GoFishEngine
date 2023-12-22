import { useState } from 'react';
import { Image, Spinner } from '@chakra-ui/react';

export default function Logo () {
  const [loading, setLoading] = useState(true);
  const handleLoad = () => { setLoading(false); };

  return (
    <>
      {loading && <Spinner />}
      <Image
        src='logo.png'
        alt="Go Fish logo"
        borderRadius="2xl"
        onLoad={handleLoad}
        style={{ display: loading ? 'none' : 'block' }}
      />
    </>
  );
};