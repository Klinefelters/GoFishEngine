import {useState} from 'react';
import { Image, Skeleton, Spinner } from '@chakra-ui/react';

export default function Logo () {
  const [loading, setLoading] = useState(true);
  const handleLoad = () => {setLoading(false);};
  return (
    <Skeleton isLoaded={!loading} startColor="transparent" endColor="transparent">
      <Image
        src='logo.png'
        alt="Go Fish logo"
        borderRadius="2xl"
        onLoad={handleLoad}
      />
    </Skeleton>
  );
};
