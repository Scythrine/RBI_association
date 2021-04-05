import Axios from "axios";

export const postNews = async (heading, body, file) => {
  try {
    let fileData = await Axios({
      method: "post",
      url: "http://localhost:5000/0900e5b2/news/upload",
      headers: "",
      data: file,
      withCredentials: true,
    });
    fileData = fileData.data.key ? fileData.data.key : null;
    await Axios({
      method: "post",
      url: "http://localhost:5000/0900e5b2/news",
      headers: "",
      data: {
        Heading: heading,
        Body: body,
        File: fileData,
      },
      withCredentials: true,
    });
  } catch (e) {
    throw e;
  }
};

export const getNews = () =>
  Axios({
    method: "get",
    url: "http://localhost:5000/0900e5b2/news",
    withCredentials: true,
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
