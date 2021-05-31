import { Box, Button, Menu, MenuItem } from "@material-ui/core";
import * as React from "react";
import { useNavigate } from "@hooks/use-navigate";
import { useState } from "react";
import { useLogout } from "@providers/logout-provider";

const classrooms = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/study", label: "Belajar" },
  { path: "/quiz", label: "Quiz" },
];
const account = [
  { path: "/profile", label: "Profile" },
  { path: "/account-setting", label: "Pengaturan" },
];

type ItemProps = {
  title: string;
  items: Array<typeof account[number]>;
};

const MenuContainer = ({
  title,
  items,
  children,
}: React.PropsWithChildren<ItemProps>) => {
  const [anchor, setAnchor] = useState<null | HTMLButtonElement>(null);
  const handleClick = (e: any) => {
    setAnchor(e.target);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  const { navigate } = useNavigate();

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        {title}
      </Button>
      <Menu
        PaperProps={{ style: { minWidth: 300 } }}
        onClose={handleClose}
        open={Boolean(anchor)}
        anchorEl={anchor}
      >
        {items.map((item) => (
          <MenuItem
            onClick={() => {
              navigate(item.path);
              handleClose();
            }}
            key={item.path}
          >
            {item.label}
          </MenuItem>
        ))}
        {children}
      </Menu>
    </>
  );
};

export const Navigator = ({ height }: { height: number }) => {
  const { openDialog } = useLogout();

  return (
    <Box marginLeft="auto">
      <MenuContainer title="Ruang kelas" items={classrooms} />
      <MenuContainer title="Akun" items={account}>
        <MenuItem onClick={openDialog}>Logout</MenuItem>
      </MenuContainer>
    </Box>
  );
};
