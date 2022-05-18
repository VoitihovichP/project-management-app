import React, { FC, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import MaterialUISwitch from './MaterialUISwitch';
import './lang-switch.scss';

const LangSwitch: FC = () => {
  const [state, setState] = useState({
    switch: false,
  });

  const handleLangSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Stack className="language-switch" direction="row" spacing={1} alignItems="center">
      <Typography onClick={() => setState({ switch: false })} className="language-switch_left-text">
        RU
      </Typography>
      <FormControlLabel
        control={
          <MaterialUISwitch
            checked={state.switch}
            onChange={handleLangSwitch}
            name="switch"
            sx={{ m: 1 }}
          />
        }
        label=""
      />
      <Typography onClick={() => setState({ switch: true })} className="language-switch_right-text">
        EN
      </Typography>
    </Stack>
  );
};

export default LangSwitch;
