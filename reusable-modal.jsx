import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

/**
 * ReusableModal - Un componente de modal personalizable
 * 
 * @param {Object} props
 * @param {boolean} props.open - Controla si el modal está abierto
 * @param {function} props.onClose - Función a llamar al cerrar el modal
 * @param {string} props.title - Título opcional para el modal
 * @param {string} props.description - Texto de descripción para el modal
 * @param {React.ReactNode} props.icon - Componente de icono a mostrar
 * @param {string} props.iconColor - Color para el icono (por defecto: "#1FFF79")
 * @param {string|Object} props.image - Fuente de imagen opcional o componente a mostrar en lugar del icono
 * @param {Object} props.confirmButton - Configuración para el botón de confirmación
 * @param {string} props.confirmButton.text - Texto para el botón de confirmación
 * @param {function} props.confirmButton.onClick - Función a llamar cuando se hace clic en el botón de confirmación
 * @param {Object} props.confirmButton.sx - Estilos adicionales para el botón de confirmación
 * @param {string} props.maxWidth - Ancho máximo del diálogo ("xs", "sm", "md", "lg", "xl")
 * @param {Object} props.sx - Estilos adicionales para el componente Paper del diálogo
 * @returns {React.ReactElement}
 */
const ReusableModal = ({
  open,
  onClose,
  title,
  description,
  icon,
  iconColor = "#1FFF79",
  image,
  confirmButton = {
    text: "Confirmar",
    onClick: () => {},
    sx: {},
  },
  maxWidth = "xs",
  sx = {},
}) => {
  // Determina si mostrar un icono o una imagen
  const renderIconOrImage = () => {
    if (image) {
      // Verifica si es un objeto de imagen importado de Next.js
      if (typeof image === 'object' && 'src' in image) {
        return (
          <Box sx={{ width: '80px', height: '80px', position: 'relative' }}>
            <Image 
              src={image} 
              alt="Icono del modal"
              width={80}
              height={80}
              style={{ objectFit: 'contain' }}
            />
          </Box>
        );
      } 
      // Si es una cadena de texto (URL), renderiza una etiqueta img básica
      else if (typeof image === 'string') {
        return (
          <Box
            component="img"
            src={image}
            alt="Icono del modal"
            sx={{
              width: '80px',
              height: '80px',
              objectFit: 'contain',
            }}
          />
        );
      } 
      // Si es otro tipo de componente, simplemente renderízalo
      else {
        return image;
      }
    }

    // Si se proporciona un icono, clónalo con el color especificado
    if (icon) {
      return React.cloneElement(icon, {
        sx: {
          fontSize: "80px",
          color: iconColor,
          ...(icon.props.sx || {}),
        },
      });
    }

    // Retorna null si no se proporciona ni icono ni imagen
    return null;
  };

  return (
    <Dialog
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      open={open}
      PaperProps={{
        style: {
          backgroundColor: "#2B2B2B",
          borderRadius: "13px",
          ...sx,
        },
      }}
    >
      {title && (
        <DialogTitle sx={{ backgroundColor: "transparent", color: "#FFFFFF" }}>
          {title}
        </DialogTitle>
      )}
      
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "#1FFF79",
        }}
      >
        <CloseIcon />
      </IconButton>
      
      <DialogContent>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          gap={3}
        >
          {renderIconOrImage()}
          
          {description && (
            <Typography color="#FFFFFF">
              {description}
            </Typography>
          )}
        </Stack>
      </DialogContent>
      
      <DialogActions sx={{ pb: 4 }}>
        <Button
          sx={{
            borderRadius: "12px",
            mx: "auto",
            backgroundColor: "#1FFF79",
            color: "#2B2B2B",
            '&:hover': {
              backgroundColor: "#19CC61",
            },
            ...confirmButton.sx,
          }}
          onClick={confirmButton.onClick}
        >
          {confirmButton.text}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReusableModal;