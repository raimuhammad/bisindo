import React from "react";
import { useResposiveCycles } from "hooks/use-responsive-cycles";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  TypographyVariant,
} from "@material-ui/core";
import { useNavigate } from "hooks/use-navigate";
import { pageLayoutStore, Context, ILayoutPage } from "./store";
import { layoutStore } from "root/layout/layout.store";
import { ArrowBack } from "@material-ui/icons";
import { Props, CustomButtonOpt } from "./types";
import { useClasses } from "./styles";
import { observer } from "mobx-react";

export function usePageLayout(): ILayoutPage {
  return React.useContext(Context) as ILayoutPage;
}

export const Component = observer((props: React.PropsWithChildren<Props>) => {
  const classes = useClasses();

  const { pageTitle, children, customButton, backPath } = props;
  const headerHeight = pageLayoutStore.headerHeight;
  React.useEffect(() => {
    const pageHeight = layoutStore.pageHeight - layoutStore.appbarHeight;
    pageLayoutStore.setPageHeight(pageHeight);
  }, [headerHeight]);

  const variant = useResposiveCycles<TypographyVariant>({ lg: "h3", sm: "h5" });

  const { navigateHandler } = useNavigate();

  const renderCustomButton = React.useCallback(() => {
    if (!customButton) {
      return null;
    }
    if (React.isValidElement(customButton)) {
      return (
        <Box paddingX={3} marginLeft="auto">
          {customButton}
        </Box>
      );
    }
    const opt = customButton as CustomButtonOpt;
    return (
      <Box paddingX={3} marginLeft="auto">
        <Button startIcon={opt.icon} onClick={opt.onClick}>
          {opt.label}
        </Button>
      </Box>
    );
  }, []);

  return (
    <Context.Provider value={pageLayoutStore}>
      <div
        style={{
          height: layoutStore.pageHeight - layoutStore.appbarHeight,
          overflow: "hidden",
          paddingLeft: "1rem",
        }}
      >
        <div ref={pageLayoutStore.setHeaderHeight}>
          <div className={classes.header}>
            {!backPath ? null : (
              <IconButton onClick={navigateHandler(backPath)}>
                <ArrowBack />
              </IconButton>
            )}
            <Box>
              <Typography variant={variant}>{pageTitle}</Typography>
            </Box>
            {!customButton ? null : renderCustomButton()}
          </div>
          <Divider />
        </div>
        <div
          style={{
            height: pageLayoutStore.contentHeight,
            overflow: "auto",
          }}
        >
          {pageLayoutStore.contentHeight > 0 ? children : null}
        </div>
      </div>
    </Context.Provider>
  );
});
