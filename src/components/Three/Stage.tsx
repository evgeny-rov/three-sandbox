import { useThree } from 'react-three-fiber';
import { TextureLoader, sRGBEncoding, EquirectangularReflectionMapping } from 'three';
import hdrmap from '../../assets/hdr5.png';

export const SkyBox = () => {
  const { scene } = useThree();
  const loader = new TextureLoader();
  const texture = loader.load(hdrmap, (texture) => {
    texture.encoding = sRGBEncoding;
    texture.mapping = EquirectangularReflectionMapping;
  });

  scene.background = texture;
  return null;
};

