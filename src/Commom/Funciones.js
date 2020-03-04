export const transformarSegundos = (listaCanciones) => {
  
  var time = 0;
  if(listaCanciones != undefined && listaCanciones != null && listaCanciones.length > 0) {
    listaCanciones.map(f =>
      time += f.seconds
    );
  }

  var hours = Math.floor( time / 3600 );
  var minutes = Math.floor( (time % 3600) / 60 );
  var seconds = time % 60;

  //Anteponiendo un 0 a los minutos si son menos de 10 
  minutes = minutes < 10 ? '0' + minutes : minutes;

  //Anteponiendo un 0 a los segundos si son menos de 10 
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return minutes + ":" + seconds;  // 2:41:30
};
