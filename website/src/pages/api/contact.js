import nextConnect from "next-connect";
import ejs from "ejs";
import {createContactMessage} from "../../libs/api";
import {verifyToken} from "../../libs/recaptcha";
import {mailTemplate, sendEmail} from "../../libs/sendmail";

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
    city: req.body.city,
    date: req.body.date || undefined,
    time: req.body.time ? `${req.body.time}:00.000` : undefined,
    service: req.body.service,
  });

  // send email to the admin
  const emailContent = ejs.render(mailTemplate, req.body);
  sendEmail(
    // eslint-disable-next-line no-process-env
    process.env.ADMIN_EMAIL,
    "Nouveau message de contact",
    emailContent,
    emailContent,
  // eslint-disable-next-line no-console
  ).catch(console.log);

  res.json(data);
});

export default apiRoute;
