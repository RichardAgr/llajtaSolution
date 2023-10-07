import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import swal from 'sweetalert';
import './Recipe.css';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const alerta= async () => {
  swal({
      title:"ELIMINAR PLATILLO",
      text:"Esta seguro de ELIMINAR el PLATILLO",
      icon:"warning",
      buttons:["No","Si"]
  }).then(respuesta=>{
      if(respuesta){
          swal({text:"El Platillo se elimino con exito",
          icon:"success"          
          })        
      }
  })   
}
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
        });
      })
      .catch((error) => {
        console.error('Error al obtener el platillo:', error);
      });
  }, [id]);
  axios.get(`http://localhost:5000/stream/${platilloData.identificador}`)
  .then((response) => {
      video: response.url;
    })
    .catch((err)=>{
    console.log('problema con video '); 
    console.log(err);
  });
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

  return (
    <div>
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
            <p className="recipe-title">Nombre: {platilloData.nombre}</p>
            <p>Descripción: {platilloData.descripcion}</p>
            <div className="recipe-video">
              <h1>Video</h1>
              <video width="560" height="315" controls autoPlay>
                <source
                  src={platilloData.video}
                  type="video/mp4"
                />
                Tu navegador no admite la reproducción de video.
              </video>
            </div>
            <div className="recipe-buttons">
              <Button type="primary" icon={<EditOutlined />} onClick={() => console.log('Editar')}>
             
              </Button>
              <Button type="danger" icon={<DeleteOutlined />} onClick={alerta}>
             
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
