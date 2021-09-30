import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  //aca van las variables de clase
  coleccion_usuario: string = 'usuarios';
  constructor(private afs: AngularFirestore) {}

  listarUsuarios() {
    return this.afs.collection(this.coleccion_usuario).valueChanges();
  }

  registrarUsuario(usuario: Usuario) {
    usuario.usuario_id = this.agregarCodigoId(usuario);

    return this.afs
      .doc(this.coleccion_usuario + '/' + usuario.usuario_id)
      .set(usuario);
  }

  actualizarUsuario(usuario: Usuario) {
    return this.afs
      .doc(this.coleccion_usuario + '/' + usuario.usuario_id)
      .update(usuario);
  }

  eliminarUsuario(usuario_id: string) {
    return this.afs.doc(this.coleccion_usuario + '/' + usuario_id).delete();
  }

  agregarCodigoId(usuario: Usuario) {
    let fecha_actual_ms: string = new Date().getTime().toString();
    let letras_nombre: string = usuario.nombres.substring(0, 3);

    return fecha_actual_ms + letras_nombre;
  }
}
