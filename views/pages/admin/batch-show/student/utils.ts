import { useNodeDimension } from "@hooks/use-node-dimension";
import { useStore } from "@admin-pages/batch-show/provider";
import { useTheme } from "@material-ui/core";

export const useDimension = () => {
  const appbar = useNodeDimension();
  const paginator = useNodeDimension();
  const { contentHeight } = useStore();
  const theme = useTheme();
  const getTableHeight = () => {
    if (!appbar.dimension.height || !paginator.dimension.height) {
      return 0;
    }
    const deps =
      appbar.dimension.height + paginator.dimension.height + theme.spacing(2);
    return contentHeight - deps;
  };
  return {
    appbar: appbar.nodeRef,
    paginator: paginator.nodeRef,
    tableHeight: getTableHeight(),
  };
};
