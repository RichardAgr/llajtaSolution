import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import { useParams } from 'react-router';
import axios from 'axios';
import swal from 'sweetalert';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ModalConfirmation } from '../../ModalConfirmation/ModalConfirmation';
import './Recipe.css';



const Recipe = () => {
  const { id } = useParams();
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
        console.log("Respuesta ", response.data.respuesta);
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

  /*axios.get(`http://localhost:5000/stream/${platilloData.identificador}`)
    .then((response) => {
      video: response.url;
    })
    .catch((err) => {
      console.log('problema con video ');
      console.log(err);
    });*/

  const alertaEliminarPlatillo = async () => {
    swal({
      title: "ELIMINAR PLATILLO",
      text: "¿Está seguro de ELIMINAR el PLATILLO?",
      icon: "warning",
      buttons: ["No", "Sí"]
    }).then(respuesta => {
      if (respuesta) {
        swal({
          text: "El Platillo se eliminó con éxito",
          icon: "success"
        })
      }
    })
  }

  //variables de prueba 
  const tit = "maja";
  const des = "Este plato está preEste plato está preparado a base de arroz con Este plato está preparado a base de arroz con Este plato está preparado a base de arroz con Este plato está preparado a base de arroz con Este plato está preparado a base de arroz con Este plato está preparado a base de arroz con Este plato está preparado a base de arroz con Este plato está preparado a base de arroz con parado a base de arroz con charque (carne deshidratada), huevo, yuca y plátanos fritos, existen variaciones que reemplazan el charque por otras carnes, como la del pollo, pato, entre otros. Existen dos variedades de majadito: el majadito tostado y el majadito batido."
  return (

    <div className='recipe-container'>
      <div className="recipe-content">
        <div className="recipe-image">
          <img
            src={platilloData.imagen}
            alt="Imagen del Platillo"
            className="recipe-image"
          />
        </div>

        <div className="recipe-text">

          {/*<p className="recipe-title">Nombre: {platilloData.nombre}</p>*/}
          <p className="recipe-title">Nombre: {tit}</p>
          {/*  <p>Descripción: {platilloData.descripcion}</p> */}
          <p>Descripción: {des}</p>

        </div>

        <div className="recipe-buttons">
          <div className='buttonn'>
            <Button type="primary" icon={<EditOutlined />} onClick={() => console.log('Editar')}>
            </Button>
          </div>
          <ModalConfirmation id={platilloData.identificador} nombre={platilloData.nombre} />
        </div>

        <div className='recipe-video'>
          <div className="recipe-video">
            <h1>Video</h1>
            <ReactPlayer url={platilloData.video} controls="true" width="100%" playing="true" />
            {/*<video width="100%" controls autoPlay>
              <source
                src={platilloData.video}
                type="video/mp4"
              />
              Tu navegador no admite la reproducción de video.
              </video>*/}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Recipe;
