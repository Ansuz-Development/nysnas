// eslint-disable-next-line camelcase
import nextConnect from "next-connect";
import {getServices} from "../../libs/api";

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(400).json({error: error.message || "Oups ! Une erreur s'est produite. Veuillez réessayer!"});
  },
  onNoMatch(req, res) {
    res.status(404).json({error: "Pas trouvé"});
  },
});

apiRoute.get(async (req, res) => {
  const data = await getServices();

  res.json(data);
});

export default apiRoute;
