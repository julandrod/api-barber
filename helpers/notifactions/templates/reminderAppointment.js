function remAppointment(
    userName,
    userLastName,
    servicio,
    date,
    hour
  ) {
    return `<!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <style>
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
    
        body {
          background-color: #f4f4f4;
          width: 100%;
          height: 100vh;
          position: relative;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
            Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
    
        .bg-color {
          height: 35%;
          background-color: #539ce3;
        }
    
        .mail-container {
          width: 100%;
          display: flex;
          justify-content: center;
          position: absolute;
          top: 0;
          left: 0;
          padding: 4rem 2rem;
        }
    
        .mail-content {
          background-color: white;
          border-radius: 0.25rem;
          padding: 2rem;
          text-align: center;
          -webkit-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.18);
          -moz-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.18);
          box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.18);
        }
    
        .mail-content p {
          margin: 1.5rem 0;
          color: rgba(0, 0, 0, 0.6);
        }
    
        .mail-content span {
          width: fit-content;
          display: block;
          margin: 0 auto 1.5rem;
          padding: 1rem;
          font-weight: 500;
          border-radius: 0.25rem;
          font-size: 1.5rem;
          background-color: #d8dee9;
          color: rgba(0, 0, 0, 0.6);
        }
    
        .mail-content a {
          width: fit-content;
          display: block;
          background-color: #539ce3;
          color: white;
          margin: 0 auto;
          padding: 1rem 2rem;
          border-radius: 0.25rem;
          font-weight: 500;
          text-decoration: none;
        }
      </style>
      <body>
        <div class="bg-color" />
        <div class="mail-container">
          <div class="mail-content">
          <h2>¡Hola ${userName} ${userLastName}!</h2>
          <p>
            Te recordamos que tienes una cita agendada en The Boss Barber Shop para ${servicio}!<br />
            La cita será el día ${date} a las ${hour}.
          </p>
          </div>
            
        </div>
      </body>
    </html>`;
}

module.exports = remAppointment;