import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router';
import axios from 'axios';
import swal from 'sweetalert';
import './Recipe.css';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {ModalConfirmation} from '../../ModalConfirmation/ModalConfirmation';

import {Img} from 'react-image';


const uri = 'http://localhost:5000/media/';


const Recipe = () => {
    const {id} = useParams();
  const [platilloData, setPlatilloData] = useState({
    nombre: '',
    descripcion: '',
    video: '',
    imagen: '',
    identificador: '',
  });
  const [platillos, setPlatillos] = useState([]);

  useEffect(() => {
    console.log('realizando llamada');
    axios.get(`http://localhost:5000/mostrarPlatillos/page/${id}`)
      .then((response) => {
        console.log(response.data.respuesta);
        const platillo = response.data.respuesta;
        setPlatilloData({
          nombre: platillo.nombre,
          descripcion: platillo.descripcion,
          imagen: platillo.imagen,
          identificador: platillo.id,
          video: platillo.video,
        });
      })
      .catch((error) => {
        console.error('Error al obtener el platillo:', error);
      });
  }, [id]);


  return (
    <div>
      <div className='recipe-container'>
      <h2 className="recipe-title">{platilloData.nombre}</h2>
        <div className="recipe-content">
          <div className="recipe-image">
            <img
              src={uri+'imagen/'+platilloData.imagen}

              alt="Imagen del Platillo"
              className="recipe-image"
            />
          </div>
          <div className="recipe-text">
            <p>{platilloData.descripcion}</p>
            <div className="recipe-video">
              <h1>Video</h1>
              <ReactPlayer url={uri+'video/'+platilloData.video} controls={true} width="560" height="315" playing={true}/>
            </div>
          </div>
          <div className="recipe-buttons">
            <div className='buttonn'>
              <Button type="primary" icon={<EditOutlined />} onClick={() => console.log('Editar')}>
              </Button>
            </div>
            <ModalConfirmation id={platilloData.identificador} nombre={platilloData.nombre} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;


// tutor proctor IEEEXtreme: 60116562