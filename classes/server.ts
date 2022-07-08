import express  from 'express';
import 'dotenv/config'
import socketIO from 'socket.io';
import http from 'http'

import * as socket from '../sockets/socket'


export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    constructor(){

        this.app = express();
        this.port = Number(process.env.PORT);
        this.httpServer = new http.Server(this.app)
        this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true } } );

        this.listeningSockets();

    }
    
    // Asegurar una unica instancia del Server
    public static get instance(){
        return this._instance || ( this._instance = new this() );
    }

    private listeningSockets(){
        
        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {

            //metodo cuando se conecta un cliente
            socket.conectado(cliente);

            //metodo cuando se desconecta un cliente
            socket.desconectado(cliente);
            
            //metodo para recibir mensajes del cliente
            socket.escucharMensaje(cliente, this.io);
            
            
        })
        
        
    }

    start = ( callback: (() => void) ) => {
        this.httpServer.listen( this.port, callback );
    } 
}