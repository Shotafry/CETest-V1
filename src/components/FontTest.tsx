import { Box, Typography, Paper } from '@mui/material';
import { useEffect, useState } from 'react';

function FontTest() {
  const [fontInfo, setFontInfo] = useState({
    bodyFont: '',
    fontsStatus: '',
    satoshiLoaded: false
  });

  useEffect(() => {
    // Obtener información sobre las fuentes cargadas
    setTimeout(() => {
      setFontInfo({
        bodyFont: window.getComputedStyle(document.body).fontFamily,
        fontsStatus: document.fonts ? 'API fonts disponible' : 'API fonts no disponible',
        satoshiLoaded: document.fonts && document.fonts.check('1em "Satoshi"')
      });
    }, 500); // Pequeño retraso para asegurar que las fuentes se carguen
  }, []);

  return (
    <Paper sx={{ p: 3, my: 3 }}>
      <Typography variant="h4" gutterBottom>
        Prueba de Fuente Satoshi
      </Typography>
      
      <Box sx={{ mt: 2, mb: 4 }}>
        <Typography variant="body1" paragraph>
          Este texto debería usar la fuente Satoshi Regular (400).
        </Typography>
        
        <Typography variant="body1" sx={{ fontWeight: 500 }} paragraph>
          Este texto debería usar la fuente Satoshi Medium (500).
        </Typography>
        
        <Typography variant="body1" sx={{ fontWeight: 700 }} paragraph>
          Este texto debería usar la fuente Satoshi Bold (700).
        </Typography>
      </Box>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Información de depuración de fuentes:
        </Typography>
        
        <pre style={{ 
          background: '#f5f5f5', 
          padding: 16, 
          borderRadius: 8,
          overflow: 'auto',
          fontSize: 14
        }}>
{`font-family: ${fontInfo.bodyFont}
status: ${fontInfo.fontsStatus}
satoshi cargada: ${fontInfo.satoshiLoaded ? 'Sí' : 'No'}
`}
        </pre>
      </Box>
    </Paper>
  );
}

export default FontTest;