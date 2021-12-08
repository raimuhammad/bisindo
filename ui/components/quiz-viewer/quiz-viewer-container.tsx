import { AppBar, Box, Button, Drawer, Toolbar } from "@mui/material";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  show: boolean;
  handleClose(v: boolean): void;
};

type UseDimension = {
  height: number | string;
  width: number | string;
} & Props;

const DimensionContext = createContext<UseDimension | null>(null);
export const useQuizDimension = () =>
  useContext(DimensionContext) as UseDimension;

export const QuizViewerContainer = ({
  children,
  ...props
}: PropsWithChildren<Props>) => {
  const { show, handleClose } = props;
  const headerRef = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState<
    Record<"height" | "width", number | string>
  >({
    height: 0,
    width: 0,
  });
  useEffect(() => {
    if (headerRef.current && show) {
      const header = headerRef.current as HTMLDivElement;
      setDimension({
        height: window.innerHeight - header.clientHeight,
        width: "100vw",
      });
    }
  }, [show, headerRef]);
  return (
    <Drawer
      keepMounted
      open={show}
      anchor="bottom"
      sx={{
        zIndex: 1000 * 1000,
      }}
      PaperProps={{ sx: { minHeight: "100vh", width: "100vw" } }}
      onClose={() => handleClose(false)}
    >
      <AppBar
        color="transparent"
        variant="outlined"
        elevation={0}
        ref={headerRef}
        sx={{ position: "static" }}
      >
        <Toolbar>
          <Button onClick={() => handleClose(false)}>Tutup</Button>
        </Toolbar>
      </AppBar>
      <DimensionContext.Provider
        value={{
          ...dimension,
          show,
          handleClose,
        }}
      >
        <Box sx={{ ...dimension, overflow: "hidden" }}>
          {!dimension.height ? <p>lol</p> : children}
        </Box>
      </DimensionContext.Provider>
    </Drawer>
  );
};
