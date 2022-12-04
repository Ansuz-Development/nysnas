import nextConnect from "next-connect";
import {createContactMessage} from "../../libs/api";
import {verifyToken} from "../../libs/recaptcha";

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(400).json({error: error.message || "Oups ! Une erreur s'est produite. Veuillez réessayer!"});
  },
  onNoMatch(req, res) {
    res.status(404).json({error: "Pas trouvé"});
  },
});

apiRoute.post(async (req, res) => {
  const verified = await verifyToken(req.body.token);

  if (!verified) {
    throw new Error("Google Recaptcha token est invalide");
  }

  const data = await createContactMessage({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    zipcode: req.body.zipcode,
    date: req.body.date,
    time: req.body.time,
  });

  res.json(data);
});

export default apiRoute;
