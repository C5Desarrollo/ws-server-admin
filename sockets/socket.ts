import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import Server from '../classes/server';

// Funcion cuando un cliente se conecta
export const conectado = ( cliente:Socket )=>{
    
    // console.log('cliente conectado',{cliente});
    console.log('cliente conectado');
}

// Funcion cuando se desconecta un cliente
export const desconectado = ( cliente: Socket )=>{

    cliente.on('disconnect', ()=>{
        console.log('cliente desconectado');
        
    });
}

export const escucharMensaje= ( cliente: Socket, io: socketIO.Server)=>{
    
    cliente.on('mensaje', ( payload )=>{
        
        console.log(payload);

        io.emit('mensaje-nuevo', payload)
        
    
    });


}