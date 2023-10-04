import { Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import { CardPlan } from "../../../shared/components/card-plan/index";
import { packagePlans } from "../../../shared/services/api/planos/packagePlans";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

interface ContainerPlanProps {
  roomUrl: string | null;
}

export const ContainerPlan = ({ roomUrl }: ContainerPlanProps) => {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CardPlan />
          <Grid item>
            <Container sx={{ width: 500, color: "white" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="white"
              >
                Each package includes
              </Typography>
              {packagePlans.map((packageItem, index) => (
                <Typography component="div" key={index} color="white">
                  ✔️ {packageItem}
                </Typography>
              ))}
              <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
              <Typography component="div" color="white">
                Highly recommended for companies and developers.
              </Typography>
              {roomUrl && (
                <Alert severity="warning">
                  Are you using: <strong>🧑‍🤝‍🧑 Human Service</strong>
                </Alert>
              )}
            </Container>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
