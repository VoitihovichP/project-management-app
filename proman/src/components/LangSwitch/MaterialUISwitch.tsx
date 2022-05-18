import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 45,
  height: 22,
  padding: 7.3,
  display: 'flex',
  alignItems: 'center',
  '& .MuiSwitch-switchBase': {
    display: 'flex',
    alignItems: 'center',
    margin: '1.5%',
    padding: 0,
    transform: 'translateX(2px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(21px)',
      '& .MuiSwitch-thumb:before': {
        content: "''",
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#ffffff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#1976d2',
    width: 20,
    height: 18,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#ffffff',
    borderRadius: 20 / 2,
  },
}));

export default MaterialUISwitch;
