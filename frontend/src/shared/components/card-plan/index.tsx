import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import robotfree from "../../../assets/robotfree.png";
import robotpay from "../../../assets/robotpay.png";
import Button from "@mui/material/Button";
import { planos } from "../../services/api/planos/planos";

export function CardPlan() {
  return (
    <>
      {planos.map((plano, index) => (
        <Grid item key={index}>
          <Card key={index}>
            <CardActionArea
              sx={{
                maxWidth: 250,
                height: 500,
                width: 250,
                borderRadius: "10px",
              }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  textAlign={"center"}
                  variant="h5"
                  component="div"
                >
                  {plano.name}
                </Typography>
                <Typography
                  gutterBottom
                  textAlign={"center"}
                  variant="h3"
                  component="div"
                >
                  {plano.price}
                </Typography>
                <Container sx={{ textAlign: "center", padding: "10px" }}>
                  <img
                    src={plano.img === "robotfree" ? robotfree : robotpay}
                    alt={`${plano.img}`}
                  />
                </Container>
                {plano.items.map((item, index) => (
                  <Typography
                    key={index}
                    gutterBottom
                    textAlign={"center"}
                    component="div"
                  >
                    {item}
                  </Typography>
                ))}
                <Container sx={{ textAlign: "center", padding: "10px" }}>
                  <Button variant="contained">Buy</Button>
                </Container>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </>
  );
}
