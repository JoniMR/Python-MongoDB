import { Component } from '@angular/core';
import { BancosService } from './bancos.service';
import { Bancos } from './bancos';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  bancos: Bancos[] = [];
  muestraFormulario = false;
  accion = "Añadir entidad";

  formularioBancos = new FormGroup({
    _id: new FormControl(''),
    nombre: new FormControl(''),
    bicswift: new FormControl(''),
    direccion: new FormControl(''),
    telefono: new FormControl(''),
    provincia: new FormControl(''),
    localidad: new FormControl(''),
  });

  constructor(private bancosService: BancosService) {
    this.cargaBancos();
  }

  async cargaBancos() {
    this.bancos = await this.bancosService.getBancos();
  }

  editaBancos(bancos: Bancos) {
    this.muestraFormulario = true;
    this.accion = "Editar entidad";
    this.formularioBancos.patchValue(bancos);
  }

  async borraBancos(id: string) {
    await this.bancosService.deleteBancos(id);
    this.cargaBancos();
  }

  async submitBancos() {
    let bancos = <Bancos>this.formularioBancos.value;

    if (this.accion === "Añadir entidad") {
      await this.bancosService.addBancos(bancos);
    } else {
      await this.bancosService.updateBancos(<string>bancos["_id"], bancos)
    }
    
    this.formularioBancos.reset();
    this.muestraFormulario = false;
    this.cargaBancos();
    this.accion = "Añadir entidad";
  }
}
