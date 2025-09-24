import { Box, Typography, Paper, Container, Divider } from '@mui/material';
import { useState, useEffect } from 'react';

function FontTester() {
  const [fontInfo, setFontInfo] = useState({
    bodyFont: '',
    fontsStatus: 'Comprobando...',
    satoshiLoaded: false,
    satoshiMediumLoaded: false,
    satoshiBoldLoaded: false
  });

  useEffect(() => {
    // Comprobar si las fuentes están cargadas
    setTimeout(() => {
      try {
        setFontInfo({
          bodyFont: window.getComputedStyle(document.body).fontFamily,
          fontsStatus: document.fonts ? 'API fonts disponible' : 'API fonts no disponible',
          satoshiLoaded: document.fonts && document.fonts.check('400 1em "Satoshi"'),
          satoshiMediumLoaded: document.fonts && document.fonts.check('500 1em "Satoshi"'),
          satoshiBoldLoaded: document.fonts && document.fonts.check('700 1em "Satoshi"')
        });
      } catch (error) {
        console.error('Error al verificar las fuentes:', error);
        setFontInfo({
          bodyFont: window.getComputedStyle(document.body).fontFamily,
          fontsStatus: 'Error al verificar fuentes',
          satoshiLoaded: false,
          satoshiMediumLoaded: false,
          satoshiBoldLoaded: false
        });
      }
    }, 1000);
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="700">
          Test de la Fuente Satoshi
        </Typography>
        
        <Paper sx={{ p: 4, mt: 3 }}>
          <Typography variant="h5" gutterBottom fontWeight="700">
            Variantes de peso
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Regular (400):</Typography>
              <Typography variant="body1" fontWeight="400" sx={{ fontSize: '1.2rem' }}>
                Satoshi Regular - El rápido zorro marrón salta sobre el perro perezoso.
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Medium (500):</Typography>
              <Typography variant="body1" fontWeight="500" sx={{ fontSize: '1.2rem' }}>
                Satoshi Medium - El rápido zorro marrón salta sobre el perro perezoso.
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Bold (700):</Typography>
              <Typography variant="body1" fontWeight="700" sx={{ fontSize: '1.2rem' }}>
                Satoshi Bold - El rápido zorro marrón salta sobre el perro perezoso.
              </Typography>
            </Box>
          </Box>
        </Paper>
        
        <Paper sx={{ p: 4, mt: 3 }}>
          <Typography variant="h5" gutterBottom fontWeight="700">
            Tamaños de texto
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h1">Encabezado h1</Typography>
            <Typography variant="h2">Encabezado h2</Typography>
            <Typography variant="h3">Encabezado h3</Typography>
            <Typography variant="h4">Encabezado h4</Typography>
            <Typography variant="h5">Encabezado h5</Typography>
            <Typography variant="h6">Encabezado h6</Typography>
            <Typography variant="subtitle1">Subtítulo 1</Typography>
            <Typography variant="subtitle2">Subtítulo 2</Typography>
            <Typography variant="body1">Cuerpo 1 - Texto normal en párrafos.</Typography>
            <Typography variant="body2">Cuerpo 2 - Texto secundario más pequeño.</Typography>
          </Box>
        </Paper>
        
        <Paper sx={{ p: 4, mt: 3, mb: 5 }}>
          <Typography variant="h5" gutterBottom fontWeight="700">
            Información de diagnóstico
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Box sx={{ 
            p: 2, 
            bgcolor: 'background.default', 
            border: '1px solid', 
            borderColor: 'divider',
            borderRadius: 1
          }}>
            <pre style={{ fontFamily: 'monospace', margin: 0, whiteSpace: 'pre-wrap' }}>
              {`Fuente del body: ${fontInfo.bodyFont}
API de Fuentes: ${fontInfo.fontsStatus}
Satoshi Regular cargada: ${fontInfo.satoshiLoaded ? '✅ Sí' : '❌ No'}
Satoshi Medium cargada: ${fontInfo.satoshiMediumLoaded ? '✅ Sí' : '❌ No'}
Satoshi Bold cargada: ${fontInfo.satoshiBoldLoaded ? '✅ Sí' : '❌ No'}`}
            </pre>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default FontTester;