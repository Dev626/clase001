import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  sub_listar_usuario: any;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.titulo = 'Componente Calculadora';
    this.fecha_actual = new Date();
    this.lista_usuarios = [];
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

    // if (this.formGroupRegister.valid) {

    // }
  }

  listarUsuarios() {
    this.sub_listar_usuario = this.usuarioService
      .listarUsuarios()
      .subscribe((usuarios) => {
        this.lista_usuarios = usuarios;
      });
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
