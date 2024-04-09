import React,{useState} from 'react';
import { prodActions } from '../pages/prod_action';

function isHttpUrl(url) {
    return url.startsWith("https://");
  }

  const [imageUrl, setImageUrl] = useState("");

  const getImage = async (imagename) => {
    try {
      const imageFile = await dispatch(prodActions.getImage(imagename));
      const url = window.URL.createObjectURL(imageFile);
      setImageUrl(url);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (prodDetail.prodImage) {
      if (isHttpUrl(prodDetail.prodImage)) {
        setImageUrl(prodDetail.prodImage);
      } else {
        getImage(prodDetail.prodImage);
      }
    }
  }, [prodDetail.prodImage]);

    <img src={imageUrl} />

export default detail;