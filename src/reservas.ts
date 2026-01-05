import { Reserva, reservas } from "./reservas.model";

// CASO 1

class CalcularReservas {
  reservas: Reserva[];
  iva: number = 0.21;
  precioStandard: number = 100;
  precioSuite: number = 150;
  personaExtra: number = 40;

  constructor(reservas: Reserva[]) {
    this.reservas = reservas;
  }

  get precioSinIVA(): number {
    return this.reservas.reduce((acc, reserva) => {
      const precioBase =
        reserva.tipoHabitacion === "standard"
          ? this.precioStandard
          : this.precioSuite;

      const cargoPersonaExtra = (reserva.pax - 1) * this.personaExtra;

      return acc + (precioBase + cargoPersonaExtra) * reserva.noches;
    }, 0);
  }

  get precioConIVA(): number {
    return this.precioSinIVA * (1 + this.iva);
  }
}

const calcularPrecio = new CalcularReservas(reservas);

console.log("--- CASO 1 ---");
console.log("Precio sin IVA:", calcularPrecio.precioSinIVA.toFixed(2), "€");
console.log("Precio con IVA:", calcularPrecio.precioConIVA.toFixed(2), "€");

// CASO 2

class CalcularReservasTourOperador extends CalcularReservas {
  descuento: number;
  constructor(reservas: Reserva[]) {
    super(reservas);
    this.precioSuite = 100;
    this.descuento = 0.15;
  }

  get precioSinIVA(): number {
    const precioBase = super.precioSinIVA;
    return precioBase * (1 - this.descuento);
  }

  get precioConIVA(): number {
    const precioBase = super.precioConIVA;
    return precioBase * (1 - this.descuento);
  }
}

const calcularPrecioTourOperador = new CalcularReservasTourOperador(reservas);

console.log("--- CASO 2 ---");
console.log(
  "Precio sin IVA para Tour Operador:",
  calcularPrecioTourOperador.precioSinIVA.toFixed(2),
  "€"
);
console.log(
  "Precio con IVA para Tour Operador:",
  calcularPrecioTourOperador.precioConIVA.toFixed(2),
  "€"
);

// DESAFÍO

export class CalcularBase {
  reservas: Reserva[];
  iva: number = 0.21;
  personaExtra: number = 40;
  precioDesayuno: number = 15;
  precioStandard: number;
  precioSuite: number;

  constructor(
    reservas: Reserva[],
    precioStandard: number,
    precioSuite: number
  ) {
    this.reservas = reservas;
    this.precioStandard = precioStandard;
    this.precioSuite = precioSuite;
  }

  get precioSinIVA(): number {
    return this.reservas.reduce((acc, reserva) => {
      const precioBase =
        reserva.tipoHabitacion === "standard"
          ? this.precioStandard
          : this.precioSuite;

      const cargoPersonaExtra = (reserva.pax - 1) * this.personaExtra;

      const cargoDesayuno = reserva.desayuno
        ? this.precioDesayuno * reserva.pax
        : 0;

      return (
        acc + (precioBase + cargoPersonaExtra + cargoDesayuno) * reserva.noches
      );
    }, 0);
  }

  get precioConIVA(): number {
    return this.precioSinIVA * (1 + this.iva);
  }
}

export class CalcularParticular extends CalcularBase {
  constructor(reservas: Reserva[]) {
    super(reservas, 100, 150);
  }
}

export class CalcularTourOperador extends CalcularBase {
  descuento: number = 0.15;

  constructor(reservas: Reserva[]) {
    super(reservas, 100, 100);
  }

  get precioSinIVA(): number {
    return super.precioSinIVA * (1 - this.descuento);
  }

  get precioConIVA(): number {
    return super.precioConIVA * (1 - this.descuento);
  }
}

console.log("--- DESAFÍO ---");
const particular = new CalcularParticular(reservas);
console.log(
  "Precio sin IVA Particular:",
  particular.precioSinIVA.toFixed(2),
  "€"
);
console.log(
  "Precio con IVA Particular:",
  particular.precioConIVA.toFixed(2),
  "€"
);

const tourOperador = new CalcularTourOperador(reservas);
console.log(
  "Precio sin IVA Tour Operador:",
  tourOperador.precioSinIVA.toFixed(2),
  "€"
);
console.log(
  "Precio con IVA Tour Operador:",
  tourOperador.precioConIVA.toFixed(2),
  "€"
);
