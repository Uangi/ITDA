import axios from "axios";

//상품이미지
function getImage(upload, config) {
    return async (dispatch) => {
      const data = await axios
        .get(`${baseUrl}/prod/getimage/${upload}`, {
          responseType: "blob",
          config,
        })
        .then((response) => response.data);
      //dispatch(boardActions.getBoardDownload(data));
  
      return data;
    };
  }
  
  export const prodActions = {
    getImage,
  };