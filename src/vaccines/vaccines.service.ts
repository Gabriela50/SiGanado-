import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Vaccine } from './vaccine.model';
import { CreateVaccineDto, UpdateVaccineDto } from './vaccine.dto';

const MS_POR_DIA = 24 * 60 * 60 * 1000;

@Injectable()
export class VaccinesService {
  private vaccines: Vaccine[] = [];

  findAll(animalId?: string) {
    const data = animalId
      ? this.vaccines.filter((v) => v.animalId === animalId)
      : this.vaccines;
    return {
      message: 'Vacunas encontradas',
      total: data.length,
      data,
    };
  }

  findById(id: string) {
    return {
      message: 'Vacuna encontrada',
      data: this.findVaccine(id),
    };
  }

  create(vaccinePayload: CreateVaccineDto) {
    this.validarFechas(vaccinePayload.fechaAplicacion, vaccinePayload.proximaDosis);
    const newVaccine: Vaccine = {
      ...vaccinePayload,
      id: randomUUID(),
    };
    this.vaccines.push(newVaccine);
    return {
      message: 'Vacuna registrada con éxito',
      data: newVaccine,
    };
  }

  update(id: string, vaccineChanges: UpdateVaccineDto) {
    const vaccine = this.findVaccine(id);
    const updatedVaccine = { ...vaccine, ...vaccineChanges };
    this.validarFechas(updatedVaccine.fechaAplicacion, updatedVaccine.proximaDosis);

    const index = this.vaccines.findIndex((v) => v.id === id);
    this.vaccines[index] = updatedVaccine;
    return {
      message: 'Vacuna actualizada con éxito',
      data: updatedVaccine,
    };
  }

  delete(id: string) {
    const index = this.vaccines.findIndex((v) => v.id === id);
    if (index === -1) {
      throw new NotFoundException(`Vacuna con ID ${id} no encontrada`);
    }
    this.vaccines.splice(index, 1);
    return {
      message: 'Vacuna eliminada con éxito',
    };
  }

  // Alertas: vacunas cuya próxima dosis ya venció o vence en los próximos `dias` días.
  findPendientes(dias: number) {
    const hoy = this.hoy();
    const pendientes = this.vaccines
      .filter((v) => v.proximaDosis)
      .map((v) => {
        const diasRestantes = this.diasEntre(hoy, v.proximaDosis!);
        return {
          ...v,
          diasRestantes,
          estado: diasRestantes < 0 ? 'vencida' : 'proxima',
        };
      })
      .filter((v) => v.diasRestantes <= dias)
      .sort((a, b) => a.diasRestantes - b.diasRestantes);

    return {
      message: `Vacunas vencidas o por aplicar en los próximos ${dias} días`,
      total: pendientes.length,
      data: pendientes,
    };
  }

  private findVaccine(id: string): Vaccine {
    const vaccine = this.vaccines.find((v) => v.id === id);
    if (!vaccine) {
      throw new NotFoundException(`Vacuna con ID ${id} no encontrada`);
    }
    return vaccine;
  }

  private validarFechas(fechaAplicacion: string, proximaDosis?: string) {
    if (fechaAplicacion.slice(0, 10) > this.hoy()) {
      throw new BadRequestException(
        'La fecha de aplicación no puede ser posterior a hoy',
      );
    }
    if (proximaDosis && proximaDosis <= fechaAplicacion) {
      throw new BadRequestException(
        'La próxima dosis debe ser posterior a la fecha de aplicación',
      );
    }
  }

  // Fecha de hoy (hora local) en formato YYYY-MM-DD.
  private hoy(): string {
    const ahora = new Date();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const dia = String(ahora.getDate()).padStart(2, '0');
    return `${ahora.getFullYear()}-${mes}-${dia}`;
  }

  // Días entre dos fechas YYYY-MM-DD (negativo si `hasta` ya pasó).
  private diasEntre(desde: string, hasta: string): number {
    const aUTC = (fecha: string) => {
      const [y, m, d] = fecha.slice(0, 10).split('-').map(Number);
      return Date.UTC(y, m - 1, d);
    };
    return Math.round((aUTC(hasta) - aUTC(desde)) / MS_POR_DIA);
  }
}
