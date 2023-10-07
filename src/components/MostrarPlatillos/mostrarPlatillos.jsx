import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import swal from 'sweetalert';

import './mostrarPlatillo.css';

function MostrarPlatillos() {
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
  axios.get(`http://localhost:5000/stream/${id}`).then(
    (response) => {
      video: response.url;
    }
  ).catch((err)=>{
    console.log('problema con video ')
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
    <div className='recipe-container'>
      <div>
        <h1>Platillo</h1>
        <div>
          <p className="recipe-title">Nombre: {platilloData.nombre}</p>
          <p>Descripción: {platilloData.descripcion}</p>
        </div>

        <h1>Video</h1>
        <div className="recipe-video">
          <video width="560" height="315" controls autoPlay>
            <source
              src={platilloData.video} 
              type="video/mp4"
            />
            Tu navegador no admite la reproducción de video.
          </video>
        </div>

        <img
          src={platilloData.imagen}
          alt="Imagen del Platillo"
          className="recipe-image"
        />

        <div className="recipe-buttons">
          <button className="edit-button" type="primary">
            {/* Agregar lógica de edición aquí */}
          </button>
          <br />
          <button
            className="delete-button"
            type="danger"
            onClick={alertaEliminarPlatillo}
          >
            {/* Agregar lógica de eliminación aquí */}
          </button>
        </div>
      </div>
    </div>
  );
}


export default MostrarPlatillos;