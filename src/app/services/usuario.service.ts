import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  collection_usuario: string = 'usuarios';

  constructor(private angularFireStore: AngularFirestore) {

  }

  agregarCodigoID(usuario) {
    let fecha_actual_ms: string = new Date().getTime().toString();
    let code_string: string = usuario.nombres.substring(0, 3);
    return code_string + fecha_actual_ms;
  }

  listarUsuarios() {
    return this.angularFireStore.collection(this.collection_usuario).valueChanges();
  }

  registrarUsuario(usuario) {
    usuario.usuario_id = this.agregarCodigoID(usuario);
    return this.angularFireStore.doc(this.collection_usuario + '/' + usuario.usuario_id).set(usuario);
  }

  actualizarUsuario(usuario) {
    return this.angularFireStore.doc(this.collection_usuario + '/' + usuario.usuario_id).update(usuario);
  }

  eliminarUsuario(usuario) {
    return this.angularFireStore.doc(this.collection_usuario + '/' + usuario.usuario_id).delete();
  }
}
