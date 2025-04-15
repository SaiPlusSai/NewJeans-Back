// cifrar.js
import bcrypt from 'bcrypt';

const password = '123456'; // <-- aquí va la contraseña que quieras cifrar

bcrypt.hash(password, 10).then(hash => {
  console.log('Contraseña encriptada:', hash);
}).catch(err => {
  console.error('Error al encriptar:', err);
});
