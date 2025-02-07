import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessibilityOptions } from '../../store/accessibilty';
import { RootState } from '../../store/store';

const AccessibilityPage = () => {
  const dispatch = useDispatch();
  const dark = useSelector((state: RootState) => state.accessibilty.isDark);

  const handleToggle = () => {
    dispatch(setAccessibilityOptions({ isDark: !dark }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: dark ? 'grey.900' : 'grey.100',
          color: dark ? 'common.white' : 'text.primary',
          borderRadius: 2,
          p: 3,
        }}
      >
        <Typography variant="body1" gutterBottom>
          Toggle Dark Mode
        </Typography>
        <Switch
          checked={dark}
          onChange={handleToggle}
          inputProps={{ 'aria-label': 'dark mode toggle' }}
        />
      </Box>
    </Container>
  );
};

export default AccessibilityPage;
