import type { ReactNode } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardActions, 
  Typography, 
  IconButton,
  Divider
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface CustomCardProps {
  title?: string;
  subheader?: string;
  children: ReactNode;
  action?: ReactNode;
  footer?: ReactNode;
  className?: string;
  showMoreMenu?: boolean;
  onMoreClick?: () => void;
}

/**
 * Componente de tarjeta personalizado y reutilizable
 */
function CustomCard({
  title,
  subheader,
  children,
  action,
  footer,
  className = '',
  showMoreMenu = false,
  onMoreClick,
}: CustomCardProps) {
  return (
    <Card className={`custom-card ${className}`} elevation={1}>
      {title && (
        <CardHeader
          title={<Typography variant="h6">{title}</Typography>}
          subheader={subheader}
          action={
            action || (showMoreMenu && (
              <IconButton onClick={onMoreClick}>
                <MoreVertIcon />
              </IconButton>
            ))
          }
        />
      )}
      <CardContent>{children}</CardContent>
      
      {footer && (
        <>
          <Divider />
          <CardActions>{footer}</CardActions>
        </>
      )}
    </Card>
  );
}

export default CustomCard;