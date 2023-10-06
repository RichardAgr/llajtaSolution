import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

function MostrarPlatillos() {
  const [platillos, setPlatillos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/mostrarPlatillos/page/1')
      .then((response) => {
        setPlatillos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los platillos:', error);
      });
  }, []);

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
      {platillos.map((platillo) => (
        <div className="recipe-container" key={platillo.id}>
          <h2 className="recipe-title">{platillo.TITULO_PLATILLO}</h2>
          <div className="recipe-content">
            <div className="recipe-image">
              <img
                src={platillo.IMAGEN_PLATILLO} // Usar la URL de la imagen del platillo
                alt={platillo.TITULO_PLATILLO}
                className="recipe-image"
              />
            </div>
            <div className="recipe-text">
              <p>{platillo.DESCRIPCION_PLATILLO}</p>
              <p>Ingredientes:</p>
              <ul>
                <li>500 gramos de charque</li>
                <li>2 tazas de arroz</li>
                <li>4 huevos</li>
                <li>4 plátanos</li>
                {/* Agregar más ingredientes aquí */}
              </ul>
              <p>Instrucciones:</p>
              <ol>
                <li>Pon a hervir el charque en una olla con agua hasta que esté tierno</li>
                <li>En una olla, agrega un poco de aceite y saltea las verduras picadas cuando esté caliente</li>
                <li>Cuando las verduras estén todas tiernas, añade el arroz y saltéalo unos minutos</li>
                <li>Vierte el agua que tenías reservada de la cocción del charque</li>
                {/* Agregar más pasos de instrucciones aquí */}
              </ol>
            </div>
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
          <div className="recipe-video">
            {/* Agregar el video utilizando el atributo URL_VIDEO */}
            <video width="560" height="315" controls>
              <source
                src={platillo.URL_VIDEO} // Usar la URL del video del platillo
                type="video/mp4"
              />
              Tu navegador no admite la reproducción de video.
            </video>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MostrarPlatillos;