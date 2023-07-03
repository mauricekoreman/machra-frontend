import { Box, Modal as MuiModal, Typography } from "@mui/material";

export const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}> = ({ open, onClose, title, children }) => {
  return (
    <MuiModal sx={{ display: "grid", placeItems: "center" }} open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          py: 2,
          px: 3,
          borderRadius: 4,
        }}
      >
        {title && <Typography variant='h5'>{title}</Typography>}
        {children}
      </Box>
    </MuiModal>
  );
};

