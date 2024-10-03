import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        bgcolor: 'background.paper',
        textAlign: 'center',
        boxShadow: '0 -1px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {currentYear} <Link href="https://harshsharma-me.netlify.app/" color="inherit">Harsh Sharma</Link>. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
