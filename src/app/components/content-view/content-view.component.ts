import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import * as _ from 'lodash';

import { CalcService } from '@services/calc.service';
import { Usuario } from '@src/app/interfaces/usuario';
import { UsuarioService } from '@src/app/services/usuario.service';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.scss'],
})
export class ContentViewComponent implements OnInit, OnDestroy {
  bool_check: boolean;
  model: string;
  numbers_calc: any[];
  result?: string;
  calcService: CalcService = new CalcService();
  titulo: string;
  fecha_actual: Date;
  @ViewChild('inputCalc', { static: true }) inputCalc?: any;
  @ViewChild('inputCalcFalse', { static: false }) inputCalcFalse?: any;

  //lista de usuarios
  lista_usuarios: Usuario[];
  usuario: Usuario;
  usuario_original: Usuario;
  sub_listar_usuario: any;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.incializarVariables();
  }

  incializarVariables() {
    this.titulo = 'Componente Calculadora';
    this.fecha_actual = new Date();
    this.bool_check = true;
    this.model = '';
    this.numbers_calc = [
      { value: '-', text: '' },
      { value: '+', text: '' },
      { value: '*', text: '' },
      { value: '/', text: '' },
      { value: '(', text: '' },
      { value: 0, text: 'zero' },
      { value: 1, text: 'one' },
      { value: 2, text: 'two' },
      { value: 3, text: 'three' },
      { value: 4, text: 'four' },
      { value: 5, text: 'five' },
      { value: 6, text: 'six' },
      { value: 7, text: 'seven' },
      { value: 8, text: 'eight' },
      { value: 9, text: 'nine' },
      { value: ')', text: '' },
    ];
  }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  ngOnDestroy() {
    if (this.sub_listar_usuario) {
      this.sub_listar_usuario.unsubscribe();
    }
  }

  listarUsuarios() {
    this.sub_listar_usuario = this.usuarioService
      .listarUsuarios()
      .subscribe((usuarios) => {
        this.lista_usuarios = usuarios;
      });
  }

  functionCalc() {
    this.result = this.calcService.evalOperation(this.model);
  }

  keyFindBtn(event: any) {
    this.numbers_calc.forEach((element, index, array) => {
      element.class =
        element.value == event.key ? 'btn-success' : 'btn-primary';
    });
  }

  functionClearCalc() {
    this.model = '';
    this.result = '';
  }

  clickParent(itemIn?: any) {
    this.model +=
      (isNaN(itemIn.value) ? ' ' : '') +
      itemIn.value +
      (isNaN(itemIn.value) ? ' ' : '');
  }

  printViewChild(element: any) {
    console.log('element:', element);
    console.log('this.inputCalc:', this.inputCalc);
    console.log('this.inputCalcFalse:', this.inputCalcFalse);
    console.log('this.inputCalc:', this.inputCalc?.nativeElement);

    let el = document.getElementById('inputCalc');
    console.log('el:', el);
  }

  registrarUsuario() {
    this.router.navigate(['/home/user']);
    localStorage.setItem('usuario', JSON.stringify({}));
  }

  mostrarUsuario(usuario: Usuario) {
    delete usuario.clave;
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.router.navigate(['/home/user/' + usuario.usuario_id]);
  }
}
