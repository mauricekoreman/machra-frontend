import { ButtonProps, CircularProgress, SxProps, Theme } from "@mui/material";
import { Button as MuiButton } from "@mui/material";

interface IButton extends ButtonProps {
  title?: string;
  component?: JSX.Element;
  sx?: SxProps<Theme>;
  loading?: boolean;
}

export const Button: React.FC<IButton> = ({ title, component, sx, loading, ...props }) => (
  <MuiButton
    variant='contained'
    size='medium'
    color='primary'
    sx={{ borderRadius: 100, textTransform: "capitalize", py: 1.5, px: 4, ...sx }}
    disabled={loading}
    {...props}
  >
    {component ? component : title}
    {loading && <CircularProgress sx={{ ml: 1 }} size={20} color='secondary' />}
  </MuiButton>
);
