import { root } from "./styles";
import { Header } from "./header";
import { Toolbar } from "@mui/material";
export const NormalLayout = () => {
  const classes = root();

  return (
    <div className={classes.root}>
      <Header />
      <div
        style={{
          minHeight: "200vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>LOL</h1>
      </div>
    </div>
  );
};
