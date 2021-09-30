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

  formGroupRegister: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  inputEmail: FormControl;
  inputPhoneNumber: FormControl;
  inputPassword: FormControl;
  repeatPassword: FormControl;

  //lista de usuarios
  lista_usuarios: Usuario[];
  usuario: Usuario;
  usuario_original: Usuario;
  form_edit: boolean;
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
    this.form_edit = false;
    // this.formGroupRegister = this.formBuilder.group({
    //   firstName: ['', Validators.required],
    //   inputPassword: ['', Validators.required],
    //   repeatPassword: ['', Validators.required],
    // });
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.inputEmail = new FormControl('', [
      Validators.required,
      Validators.pattern(this.getRegex('EMAIL')),
    ]);
    this.inputPhoneNumber = new FormControl('', [
      Validators.required,
      Validators.pattern(this.getRegex('PHONE_NUMBER')),
    ]);
    this.inputPassword = new FormControl('', Validators.required);
    this.repeatPassword = new FormControl('', Validators.required);

    this.formGroupRegister = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      inputEmail: this.inputEmail,
      inputPhoneNumber: this.inputPhoneNumber,
      inputPassword: this.inputPassword,
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

  sendFormData() {
    console.log('this.formGroupRegister:', this.formGroupRegister);
    if (this.formGroupRegister.valid) {
      this.usuario.nombres = this.formGroupRegister.get('firstName').value
      this.usuario.apellidos = this.formGroupRegister.get('lastName').value
      this.usuario.correo = this.formGroupRegister.get('inputEmail').value
      this.usuario.nro_telefono = this.formGroupRegister.get('inputPhoneNumber').value
      this.usuario.clave = this.formGroupRegister.get('inputPassword').value
      let clave_repeat = this.formGroupRegister.get('repeatPassword').value
      if (this.usuario.clave == clave_repeat) {
        this.registrarUsuario();
      } else {
        alert('claves no coinciden');
      }
    }
  }

  registrarUsuario() {
    console.log('this.usuario:', this.usuario)
    this.usuarioService.registrarUsuario(this.usuario)
  }

  listarUsuarios() {
    this.sub_listar_usuario = this.usuarioService
      .listarUsuarios()
      .subscribe((usuarios) => {
        this.lista_usuarios = usuarios;
      });
  }

  mostrarUsuario(usuario: Usuario) {
    this.usuario_original = { ...usuario };

    this.usuario = usuario;
    this.formGroupRegister.get('firstName').setValue(this.usuario.nombres);
    this.formGroupRegister.get('lastName').setValue(this.usuario.apellidos);
    this.formGroupRegister.get('inputEmail').setValue(this.usuario.correo);
    this.formGroupRegister.get('inputPhoneNumber').setValue(this.usuario.nro_telefono);
    // this.formGroupRegister.value(this.usuario);

    // let usuario_clone: Usuario = JSON.parse(JSON.stringify(this.usuario));
    // let usuario_clone_b: Usuario = { ...usuario,  };

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
