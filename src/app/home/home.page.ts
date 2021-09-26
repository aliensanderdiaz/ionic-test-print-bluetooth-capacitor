import { Component } from '@angular/core';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

import EscPosEncoder from 'esc-pos-encoder-ionic';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  mensajes = []
  conectado = false;

  constructor(
    private bluetoothSerial: BluetoothSerial
  ) { }

  imprimir() {
    console.log({ funcion: 'imprimir' })

    const encoder = new EscPosEncoder();

    let result = encoder.initialize();

    let img = new Image();
    img.src = 'assets/logo.png';

    img.onload = async () => {

      let dataPrint = result
        .image(img, 560, 560, 'atkinson', 128)
        .newline()
        .align('center')
        .bold(true)
        .line('ALMACENES UNIVERSAL S.A.S.')
        .bold(false)
        .line('NIT 901260162-8')
        .line('TEL: 8711366 / CEL: 3125512258')
        .line('CARRERA 3 # 9 - 101')
        .line('NEIVA - HUILA')
        .newline()
        .newline()
        .newline()
        .newline()
        .newline()
        .newline()
        .cut()
        .encode()

      this.bluetoothSerial.connect('DC:0D:30:80:E9:5D')
        .subscribe(
          async () => {
            await this.bluetoothSerial.write(dataPrint)
          }
        )
    }

  }

  sleep(ms) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async test() {
    this.mensajes.push('Funcion test')
    try {
      let estaConectado = await this.bluetoothSerial.isConnected()
      this.mensajes.push(`estaConectado ${ JSON.stringify(estaConectado) }`)
    } catch (error) {
      this.mensajes.push(`error estaConectado ${ JSON.stringify(error) }`)
      this.mensajes.push('1')
      this.conectar()
      this.mensajes.push('2')
      await this.sleep(2000)
      this.mensajes.push('3')
      const encoderInicial = new EscPosEncoder();
      this.mensajes.push('4')
      const dataInicial = encoderInicial.initialize().newline().encode()
      this.mensajes.push('5')
      await this.bluetoothSerial.write(dataInicial)
      this.mensajes.push('6')  
    }
    // if (!this.conectado) {
      // if (!this.conectado) {
      // this.mensajes.push('1')
      // this.conectar()
      // this.mensajes.push('2')
      // await this.sleep(2000)
      // this.mensajes.push('3')
      // const encoderInicial = new EscPosEncoder();
      // this.mensajes.push('4')
      // const dataInicial = encoderInicial.initialize().newline().encode()
      // this.mensajes.push('5')
      // await this.bluetoothSerial.write(dataInicial)
      // this.mensajes.push('6')
    // }

    const encoder = new EscPosEncoder();

    let result = encoder.initialize();

    let dataPrint = result
      .newline()
      .align('center')
      .bold(true)
      .line('ALMACENES UNIVERSAL S.A.S.')
      .bold(false)
      .line('NIT 901260162-8')
      .line('TEL: 8711366 / CEL: 3125512258')
      .line('CARRERA 3 # 9 - 101')
      .line('NEIVA - HUILA')
      .newline()
      .newline()
      .newline()
      .newline()
      .newline()
      .newline()
      .cut()
      .encode()



      if (this.conectado) {
        try {
          this.mensajes.push('Antes de imprimir')
          await this.bluetoothSerial.write(dataPrint)
          this.mensajes.push('Despues de imprimir')
        } catch (error) {
          this.mensajes.push('catch')        
        }
      } 

  }

  async conectar() {
    this.mensajes.push('Funcion Conectar')
    // if (this.conectado) {
    //   this.mensajes.push('Conectado... No se termina la funcion')
    //   return
    // }

    this.bluetoothSerial.isConnected().then(
      (resolve: any) => {
        this.mensajes.push('Conectado... No se termina la funcion')
      }
    ).catch(
      (reject: any) => {
        this.bluetoothSerial.connect('DC:0D:30:80:E9:5D').subscribe(
          (data: any) => {
            this.mensajes.push('connectData: ' + JSON.stringify(data))
            this.conectado = true;
          },
          (error: any) => {
            this.mensajes.push('connectError: ' + JSON.stringify(error))
            this.conectado = false;
          },
          () => {
            this.mensajes.push('connectFinalizo')
            this.conectado = false;
          }
        )
      }
    )
  }

  async conectarConPromesa() {
    this.mensajes.push('Funcion conectarConPromesa')
    try {
      let conexion = await this.bluetoothSerial.connect('DC:0D:30:80:E9:5D').toPromise()
      this.mensajes.push(`conexion ${ JSON.stringify(conexion) }`)
    } catch (error) {
      this.mensajes.push(`error ${ JSON.stringify(error) }`)
    }
  }

  reset() {
    this.mensajes = []
  }


}
