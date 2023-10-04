import { Form, Input, Button, Breadcrumb, Upload, message,Space, Typography } from 'antd';
import {UploadOutlined } from '@ant-design/icons';
import React, {useState} from 'react';

const {Title}=Typography

const { TextArea } = Input;
function MyForm () {
  const onFinish = (values) => {
    console.log(values);


/// paso a back end
const formData = new FormData(values);
console.log('FormData', values);

fetch('http://localhost:5000/registrarPlatillo', {
  method: 'POST',
  body: formData,
})
  .then((response) => response.json())
  .then((data) => {

    console.log(data.message); // You can replace this with any desired action
    message.success(data.message); // Display a success message
  })
  .catch((error) => {
    console.error('Error:', error);
    message.error('Error occurred while registering the platillo');
  });


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
    
    <Form 
      onFinish={onFinish}
      encType="multipart/form-data"
    >
       <Title level={2}>Registrar Platillo</Title>
      <Breadcrumb
          style={{
            margin: '30px 0',
          }}
        >
    </Breadcrumb>
      <Form.Item
        label={
        <span>Título:<span style={{ color: 'red', marginLeft: '4px' }}></span></span>}
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
         <Upload  {...verificar} maxCount={1} name="imagen">
            <Button style={buttonStyle} icon={<UploadOutlined />}>Subir Imagen</Button>
            {fileUploaded && <span style={{ marginLeft: '8px'  }}></span>}
            {!fileUploaded && <span style={{ marginLeft: '8px', opacity: 0.5  }}> No se ha seleccionado ningún archivo</span>}
          </Upload>
      </Form.Item >
{/*descripcion*/}
      <Form.Item
        label={
        <span>Descripción:<span style={{ color: 'red', marginLeft: '4px' }}></span></span>}
        name="descripcion"
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
      <Upload  {...verificar} maxCount={1} name="video">
            <Button style={buttonStyle} icon={<UploadOutlined />}>Subir Video  </Button>
            {fileUploaded && <span style={{ marginLeft: '8px' }}></span>}
            {!fileUploaded && <span style={{ marginLeft: '8px', opacity: 0.5 }}>No se ha seeccionado ningún archivo</span>}
          </Upload>
      </Form.Item>
      <Form.Item
        wrapperCol={{ offset: 9, span: 6 }} // Offset para mover el botón
      >
        <Button type="primary" htmlType="submit" style={{ marginRight: '20px' }}>
          Registrar
        </Button>
        <Button type="primary" htmlType="submit" style={{ marginLeft: '120px' }}>
          Cancelar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default MyForm;
