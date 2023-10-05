import React from 'react';
import swal from 'sweetalert';

const mostrarPlatillo= () => {
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
  return (
    <div className="recipe-container">
      <h2 className="recipe-title">Receta de Majadito</h2>
      <div className="recipe-content">
        <div className="recipe-image">
          <img
            src={process.env.PUBLIC_URL + '/imagen/majadito.jpeg'}
            alt="Imagen de la receta"
            className="recipe-image"
          />
        </div>
        <div className="recipe-text">
          <p>Ingredientes:</p>
          <ul>
            <li>500 gramos de charque</li>
            <li> 2 tazas de arroz</li>
            <li>4 huevos</li>
            <li>4 plátanos</li>
            {/* Agrega más ingredientes aquí */}
          </ul>
          <p>Instrucciones:</p>
          <ol>
            <li>Pon a hervir el charque en una olla con agua hasta que esté tierno</li>
            <li>En una olla, agrega un poco de aceite y saltea las verduras picadas cuando esté caliente</li>
            <li>Cuando las verduras estén todas tiernas, añade el arroz y saltéalo unos minutos</li>
            <li>Vierte el agua que tenías reservada de la cocción del charque</li>
            {/* Agrega más pasos de instrucciones aquí */}
          </ol>
        </div>
        <div className="recipe-buttons">
            <button className="edit-button" type="primary" icon={<EditOutlined />}></button>
            <br>
            </br>
            <button className="delete-button" type="danger" icon={<DeleteOutlined />} onClick={alerta}></button>
          </div>
      </div>
      <div className="recipe-video">
        {/* Agrega el video que tienes */}
        <video width="560" height="315" controls>
          <source
            src={process.env.PUBLIC_URL + '/videos/video1.mp4'}
            type="video/mp4"
          />
          Tu navegador no admite la reproducción de video.
        </video>
      </div>
    </div>
  );
};

export default mostrarPlatillo;
