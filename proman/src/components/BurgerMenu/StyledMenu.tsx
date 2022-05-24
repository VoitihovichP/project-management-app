import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#1976d2',
    borderRadius: 6,
    marginTop: theme.spacing(1),
    width: 'fit-content',
    color: theme.palette.mode === 'light' ? '#ffffff' : '#ffffff',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    '& .MuiMenuItem-root': {
      width: '100%',
      '@media (max-width: 500px)': {
        fontSize: '0.8rem',
      },
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: '#ffffff',
        marginRight: theme.spacing(1.5),
        '@media (max-width: 500px)': {
          fontSize: '0.8rem',
        },
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

export default StyledMenu;
