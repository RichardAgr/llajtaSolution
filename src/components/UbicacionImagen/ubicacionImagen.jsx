import React from 'react';
import { Breadcrumb} from 'antd';

export const imgFormato = () => {
  const imagenStyle = {
    position: 'absolute',
    top: '0px', 
    left: '10px', 
  };
  const imagenStyle2 = {
    position: 'absolute',
    top: '0px', 
    left: '500px', 
  };

  return (
    <div>
    <img
        src="/src/assets/logo.jpeg" 
        alt="Mi Imagen"
        style={imagenStyle}
    />

    <img
        src="/src/assets/banerr.jpeg" 
        alt="Mi Imagen"
        style={imagenStyle2}
    />
    <Breadcrumb
          style={{
            margin: '60px 0',
          }}
        >
    </Breadcrumb>
    </div>
  );
}
export default imgFormato