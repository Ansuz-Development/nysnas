import axios from "axios";
import FormData from "form-data";

const secret = process.env.GOOGLE_RECAPTCHA_SECRET_KEY;

export const verifyToken = async token => {
  try {
    const data = new FormData();
    data.append("secret", secret);
    data.append("response", token);

    const res = await axios({
      method: "post",
      url: "https://www.google.com/recaptcha/api/siteverify",
      data,
      headers: {"Content-Type": "multipart/form-data"},
    });

    return res.data.success;
  } catch (error) {
    return false;
  }
};
