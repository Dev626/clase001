import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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

  formGroupActions: FormGroup;
  formInitialState: any;
  nombres: FormControl;
  apellidos: FormControl;
  correo: FormControl;
  nro_telefono: FormControl;
  clave: FormControl;
  repeatPassword: FormControl;

  //lista de usuarios
  lista_usuarios: Usuario[];
  usuario: Usuario;
  usuario_original: Usuario;
  sub_listar_usuario: any;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.titulo = 'Componente Calculadora';
    this.fecha_actual = new Date();
    this.lista_usuarios = [];
    this.usuario = {};
    this.usuario_original = {};
    // this.formGroupActions = this.formBuilder.group({
    //   nombres: ['', Validators.required],
    //   clave: ['', Validators.required],
    //   repeatPassword: ['', Validators.required],
    // });
    this.nombres = new FormControl('', Validators.required);
    this.apellidos = new FormControl('', Validators.required);
    this.correo = new FormControl('', [
      Validators.required,
      Validators.pattern(this.getRegex('EMAIL')),
    ]);
    this.nro_telefono = new FormControl('', [
      Validators.required,
      Validators.pattern(this.getRegex('PHONE_NUMBER')),
    ]);
    this.clave = new FormControl('');
    // , Validators.required
    this.repeatPassword = new FormControl('');
    // , Validators.required

    this.formGroupActions = new FormGroup({
      nombres: this.nombres,
      apellidos: this.apellidos,
      correo: this.correo,
      nro_telefono: this.nro_telefono,
      clave: this.clave,
      repeatPassword: this.repeatPassword,
    });

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

  functionCalc() {
    this.result = this.calcService.evalOperation(this.model);
  }

  getRegex(type_pattern: string) {
    switch (type_pattern) {
      case 'EMAIL':
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      case 'PHONE_NUMBER':
        return /^[0-9]*$/;
      default:
        return null;
    }
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

  cLeanForm() {
    this.usuario = {};
    this.formGroupActions.setValue({
      nombres: '',
      apellidos: '',
      correo: '',
      nro_telefono: '',
      clave: '',
      repeatPassword: '',
    });
  }

  initialEditForm() {
    // this.usuario_original.repeatPassword
    this.formGroupActions.setValue({
      nombres: this.usuario_original?.nombres || null,
      apellidos: this.usuario_original?.apellidos || null,
      correo: this.usuario_original?.correo || null,
      nro_telefono: this.usuario_original?.nro_telefono || null,
      clave: null,
      repeatPassword: null,
    });
  }

  sendFormData() {
    console.log('this.formGroupActions:', this.formGroupActions);
    if (this.formGroupActions.valid) {
      this.usuario.nombres = this.formGroupActions.get('nombres').value
      this.usuario.apellidos = this.formGroupActions.get('apellidos').value
      this.usuario.correo = this.formGroupActions.get('correo').value
      this.usuario.nro_telefono = this.formGroupActions.get('nro_telefono').value
      this.usuario.clave = this.formGroupActions.get('clave').value
      let clave_repeat = this.formGroupActions.get('repeatPassword').value

      if (this.usuario.clave == clave_repeat) {
        if (this.usuario.usuario_id) {
          this.usuarioService.actualizarUsuario(this.usuario)
        } else {
          this.usuarioService.registrarUsuario(this.usuario)
        }
        this.cLeanForm();
      } else {
        alert('claves no coinciden');
      }
    }
  }

  listarUsuarios() {
    this.sub_listar_usuario = this.usuarioService
      .listarUsuarios()
      .subscribe((usuarios) => {
        this.lista_usuarios = usuarios;
      });
  }

  mostrarUsuario(usuario: Usuario) {
    // this.form_edit = true;
    this.usuario_original = { ...usuario };
    this.usuario = usuario;
    // this.formGroupActions.get('nombres').setValue(this.usuario.nombres);
    console.log('this.usuario:', this.usuario)
    // this.formGroupActions.setValue(this.usuario);
    this.formGroupActions.setValue({
      nombres: this.usuario?.nombres || null,
      apellidos: this.usuario?.apellidos || null,
      correo: this.usuario?.correo || null,
      nro_telefono: this.usuario?.nro_telefono || null,
      clave: null,
      repeatPassword: null,
    });

    this.formInitialState = this.formCurrentState;
  }

  get formCurrentState() {
    return { ...this.formGroupActions.value }
  }

  get formChanged() {
    return _.isEqual(this.formInitialState, this.formCurrentState)
  }

  eliminarUsuario(usuario) {
    var respuesta = confirm('Seguro que desea eliminar este registro?');
    if (respuesta) this.usuarioService.eliminarUsuario(usuario)
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
}
