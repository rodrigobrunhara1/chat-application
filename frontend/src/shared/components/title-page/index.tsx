import Typography from "@mui/material/Typography";

export function TitlePage() {
  const titlePage = "Plans";
  const subTitlePage = "Choose one of our intelligent and human contact plans!";

  return (
    <>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "30px",
        }}
        variant="h4"
        color="white"
      >
        {titlePage}
      </Typography>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
        variant="h5"
        color="white"
      >
        {subTitlePage}
      </Typography>
    </>
  );
}
