import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { MenuContainer } from "./styles";

export function Menu() {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={MenuContainer}>
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Plans
        </Link>
      </Breadcrumbs>
    </>
  );
}
