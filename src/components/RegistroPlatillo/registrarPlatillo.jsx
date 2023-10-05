import { Form, Input, Button, message, Typography, Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import axios from 'axios';
import './registrarPlatillo.css';

const { Title } = Typography;

const { TextArea } = Input;
function MyForm() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  const showModal = () => {
    setCancelModalVisible(true);
  };
  const cancelOk = () => {
    // aqui viene el redireccionamiento
    setCancelModalVisible(false);
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
  };

  const handleTextChange2 = (e) => {
    const newText2 = e.target.value;
    setText2(newText2);
  };

  const verificarImagen = {
    beforeUpload: (file) => {

      let extension = file.name.split('.');
      extension = extension[extension.length-1].toLowerCase();
      if (extension!='jpeg'&&extension!='jpg'&&extension!='png') {
        message.error('Solo se permite archivos jpg y png.');
        return true;
      } 
      const tam = 6*1024*1024; 
      if (file.size>tam) {
        setImageModalVisible(true);
      } else {
        setFileUploaded(true);
        message.success(`${file.name} subido correctamente.`);
        return false;
      }
      return true;
    },
    onRemove: () => {
      // Lógica para manejar la eliminación de la imagen
      setFileUploaded(false);
      message.warning('Imagen eliminada.');
    },
  };

  const verificarVideo = {
    beforeUpload: (file) => {
      let extension = file.name.split('.');
      extension = extension[extension.length-1].toLowerCase();
      console.log(extension);
      console.log(extension=='mp4');
      if (extension!='mp4') {
        message.error('Solo permite archivos mp4'); 
        return true;
      }
      const tam = 15*1024*1024; 
      if(file.size>tam) {
        setVideoModalVisible(true);
      } else {
        setFileUploaded(true);
        message.success(`${file.name} subido correctamente.`);
        return false;
      }
      return true;
    },
    onRemove: () => {
      // Lógica para manejar la eliminación del video
      setFileUploaded(false);
      message.warning('Video eliminado.');
    },
  };

  const buttonStyle = {
    width: '150px', // Tamaño en píxeles
    height: '30px', // Tamaño en píxeles
  };

  const onFinish = async (values) => {
    console.log('Finaliza el formulario');
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
        },
      });
      console.log('Llega la llamada');
      console.log(response);
      if (response.status === 200) {
        message.success('Platillo registrado correctamente');
      } else {
        message.error('Error al registrar el platillo');
      }
    } catch (err) {
      message.error('Error con el registro');
      console.log(err);
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Title className="fuente-letra" level={2}>Registrar Platillo</Title>

      <Form.Item
        label={<span>Título:<span style={{ color: 'red', marginLeft: '4px' }}></span></span>}
        name="titulo"
        colon={false}
        rules={[
          { required: true, message: 'Ingresa el título del platillo' },
          { max: 50, message: 'El título no puede tener más de 50 caracteres' },
          { min: 6, message: 'El título debe tener al menos 6 caracteres' },
          { pattern: /^[a-zA-Z0-9\s]*$/, message: 'Solo caracteres alfanuméricos son permitidos en el título' },
        ]}
        labelCol={{ span: 7 }} // Configura el ancho de la etiqueta
        wrapperCol={{ span: 10 }} // Configura el ancho del campo de entrada
      >
        <div style={{ position: 'relative' }}>
          <Input
            placeholder="Ingrese el título del platillo"
            autoComplete="off"
            onChange={handleTextChange}
            value={text}
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
        <Upload {...verificarImagen} maxCount={1}>
          <Button style={buttonStyle} icon={<UploadOutlined />}>Subir Imagen</Button>
          {fileUploaded && <span style={{ marginLeft: '8px' }}></span>}
          {!fileUploaded && <span style={{ marginLeft: '8px', opacity: 0.5 }}> No se ha seleccionado ningún archivo</span>}
        </Upload>
      </Form.Item>

      <Form.Item
        label={
          <span>Descripción:<span style={{ color: 'red', marginLeft: '4px' }}></span></span>}
        name="descripcion"
        colon={false}
        rules={[
          { required: true, message: 'Ingrese una descripcion' },
          { max: 500, message: 'La descripción no puede tener más de 500 caracteres' },
          { min: 20, message: 'La descripción debe tener al menos 20 caracteres' },
        ]}
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
            //maxLength={500} // Limitar a 500 caracteres
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
        <Upload {...verificarVideo} maxCount={1}>
          <Button style={buttonStyle} icon={<UploadOutlined />}>Subir Video</Button>
          {fileUploaded && <span style={{ marginLeft: '8px' }}></span>}
          {!fileUploaded && <span style={{ marginLeft: '8px', opacity: 0.5 }}>No se ha seleccionado ningún video</span>}
        </Upload>
      </Form.Item>

      <Form.Item
        wrapperCol={{ offset: 7, span: 6 }} // Offset para mover el botón
      >
        <Button type="primary" htmlType="submit" className='button' style={{ marginRight: '70px' }}>
          Registrar
        </Button>
        <Button type="primary" htmlType="button" className='button' onClick={showModal}>
          Cancelar
        </Button>
      </Form.Item>

      <Modal
        title="Excede el límite de tamaño"
        visible={imageModalVisible}
        onCancel={() => setImageModalVisible(false)}
        footer={[
        ]}
      >
        El archivo de imagen excede el límite de tamaño permitido (6MB).
      </Modal>

      <Modal
        title="Excede el límite de tamaño"
        visible={videoModalVisible}
        onCancel={() => setVideoModalVisible(false)}
        footer={[
        ]}
      >
        El archivo de video excede el límite de tamaño permitido (15MB).
      </Modal>
      <Modal
        title="¿Está seguro de cancelar?"
        visible={cancelModalVisible}
        onCancel={() => setCancelModalVisible(false)}
        footer={[
          <Button key="ok" className='button' onClick={cancelOk}>
            OK
          </Button>,
          <Button key="cancel" className='button' onClick={() => setCancelModalVisible(false)}>
           Cancel
          </Button>,
        ]}
      >
        Al cancelar, se perdera toda la informacion que no se haya registrado.
      </Modal>
    </Form>
    
  );
}

export default MyForm;
