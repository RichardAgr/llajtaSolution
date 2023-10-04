import { Form, Input, Button, Breadcrumb, Upload, message,Typography, ConfigProvider } from 'antd';
import {UploadOutlined } from '@ant-design/icons';
import React, {useState} from 'react';
import axios from 'axios';
import './registrarPlatillo.css';

const {Title}=Typography

const { TextArea } = Input;
function MyForm () {
  <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#00b96b',
        borderRadius: 2,

        // Alias Token
        colorBgContainer: '#f6ffed',
      },
    }}
  ></ConfigProvider>
  const onFinish = async (values) => {
    console.log('Finaliza el formulario')
    console.log(values);
    try {
      const formData = new FormData(); 
      formData.append('nombre', values.titulo); 
      formData.append('descripcion', values.descripcion);
      formData.append('imagen', values.imagen.fileList[0].originFileObj);
      formData.append('video', values.video.fileList[0].originFileObj);
      console.log('Realizando llamada');
      const response = await axios.post('http://localhost:5000/registrarPlatillo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('Llega la llamada');
      console.log(response);
      if (response.status===200) {
        message.success('Platillo registrado correctamente');
      } else {
        message.error('Error al registrar el platillo');
      }
    } catch (err) {
      console.log(err);
    }
  };

//PASO DE FRONT END A

//Logia imagen y video
const [fileUploaded, setFileUploaded] = useState(false);

  const verificar = {
    beforeUpload: (file) => {
      // Lógica para verificar el tipo de archivo si es necesario
      setFileUploaded(true);
      message.success(`${file.name} subido correctamente.`);
      return false; // Evita que el archivo sea subido automáticamente
    },
    onRemove: () => {
      // Lógica para manejar la eliminación del archivo
      setFileUploaded(false);
      message.warning('Imagen eliminada.');
    },
  };

  const buttonStyle = {
    width: '150px', // Tamaño en píxeles
    height: '30px', // Tamaño en píxeles
  };

  const [text, setText] = useState('');
  const [text2, setText2] = useState('');

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
  };
  const handleTextChange2 = (e) => {
    const newText2 = e.target.value;
    setText2(newText2);
  };

  return (
    
    <Form onFinish={onFinish}>
       <Title className="fuente-letra" level={2}>Registrar Platillo</Title>

      
      <Form.Item
        label={<span>Título:<span style={{ color: 'red', marginLeft: '4px' }}></span></span>}
        name="titulo"
        colon={false}
        rules={[{ required: true, message: 'Ingresa el título del platillo'},
        {max: 50, message: 'El título no puede tener más de 50 caracteres'},]}
        labelCol={{ span: 7 }} // Configura el ancho de la etiqueta
        wrapperCol={{ span: 10 }} // Configura el ancho del campo de entrada
      >
        <div style={{ position: 'relative' }}>
          <Input.TextArea
            placeholder="Ingrese el título del platillo"
            autoComplete="off"
            autoSize={{ minRows: 1 }}
            onChange={handleTextChange}
            value={text}
            maxLength={50} // Limitar a 50 caracteres
          />
          <div style={{ position: 'absolute', top: 0, right: 0, padding: '8px', color: 'gray' }}>
            {text.length} / 50
          </div>
        </div>
      </Form.Item>

      <Form.Item
        label={
        <span>Imagen:<span style={{ color: 'red', marginLeft: '4px' }}></span></span>}
        name="imagen"
        colon={false}
        rules={[{ required: true, message: 'No se ha subido ninguna imagen' }]}
        labelCol={{ span: 7 }} // Configura el ancho de la etiqueta
        wrapperCol={{ span: 10 }} // Configura el ancho del campo de entrada  
      >
         <Upload  {...verificar} maxCount={1}>
            <Button style={buttonStyle} icon={<UploadOutlined />}>Subir Imagen</Button>
            {fileUploaded && <span style={{ marginLeft: '8px'  }}></span>}
            {!fileUploaded && <span style={{ marginLeft: '8px', opacity: 0.5  }}> No se ha seleccionado ningún archivo</span>}
          </Upload>
      </Form.Item >
{/*descripcion*/}
      <Form.Item
        label={
        <span>Descripción:<span style={{ color: 'red', marginLeft: '4px' }}></span></span>}
        name="descripción"
        colon={false}
        rules={[{ required: true, message: 'Ingrese una descripcion' },
        { max: 500, message: 'El título no puede tener más de 500 caracteres' },]}
        labelCol={{ span: 7 }} // Configura el ancho de la etiqueta
        wrapperCol={{ span: 10 }} // Configura el ancho del campo de entrada
      >
<div style={{ position: 'relative' }}>
          <Input.TextArea
            placeholder="Ingrese una descripción del platillo"
            autoComplete="off"
            autoSize={{ minRows: 3, maxRows: 6 }}
            onChange={handleTextChange2}
            value={text2}
            maxLength2={500} // Limitar a 100 caracteres
          />
          <div style={{ position: 'absolute', top: 0, right: 0, padding: '8px', color: 'gray' }}>
            {text2.length} / 500
          </div>
        </div>
      </Form.Item>

      <Form.Item
      label={
        <span>Video:<span style={{ color: 'red', marginLeft: '4px' }}></span></span>}
        name="video"
        colon={false}
        rules={[{ required: true, message: 'No se ha subido ningun video' }]}
        labelCol={{ span: 7 }} // Configura el ancho de la etiqueta
        wrapperCol={{ span: 10 }} // Configura el ancho del campo de entrada
      >      
      <Upload  {...verificar} maxCount={1}>
            <Button style={buttonStyle} icon={<UploadOutlined />}>Subir Video  </Button>
            {fileUploaded && <span style={{ marginLeft: '8px' }}></span>}
            {!fileUploaded && <span style={{ marginLeft: '8px', opacity: 0.5 }}>No se ha seleccionado ningún archivo</span>}
          </Upload>
      </Form.Item>
      <Form.Item
        wrapperCol={{ offset: 7, span: 6 }} // Offset para mover el botón
       
      >
        <Button type="primary"  htmlType="submit"  className='button' style={{ marginRight: '70px' }}>
          Registrar
        </Button>
        <Button type="primary" htmlType="button"  className='button'>
          Cancelar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default MyForm;
