import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VaccineEntity } from './entities/vaccine.entity';
import { CreateVaccineDto, UpdateVaccineDto } from './vaccine.dto';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

@Injectable()
export class VaccinesService {
  constructor(
    @InjectRepository(VaccineEntity)
    private readonly vaccineRepository: Repository<VaccineEntity>,
  ) {}

  async findAll(animalId?: string) {
    // Filtra por animal si se envía el query param animalId
    const data = animalId
      ? await this.vaccineRepository.find({ where: { animalId } })
      : await this.vaccineRepository.find();

    return {
      message: 'Vacunas encontradas',
      total: data.length,
      data,
    };
  }

  async findById(id: string) {
    const vaccine = await this.findVaccineOrFail(id);
    return {
      message: 'Vacuna encontrada',
      data: vaccine,
    };
  }

  async create(vaccinePayload: CreateVaccineDto) {
    this.validateDates(
      vaccinePayload.fechaAplicacion,
      vaccinePayload.proximaDosis,
    );

    const newVaccine = this.vaccineRepository.create(vaccinePayload);
    const savedVaccine = await this.vaccineRepository.save(newVaccine);

    return {
      message: 'Vacuna registrada con éxito',
      data: savedVaccine,
    };
  }

  async update(id: string, vaccineChanges: UpdateVaccineDto) {
    const existingVaccine = await this.findVaccineOrFail(id);
    const mergedVaccine = this.vaccineRepository.merge(
      existingVaccine,
      vaccineChanges,
    );

    this.validateDates(
      mergedVaccine.fechaAplicacion,
      mergedVaccine.proximaDosis,
    );

    const updatedVaccine = await this.vaccineRepository.save(mergedVaccine);

    return {
      message: 'Vacuna actualizada con éxito',
      data: updatedVaccine,
    };
  }

  async delete(id: string) {
    const vaccine = await this.findVaccineOrFail(id);
    await this.vaccineRepository.remove(vaccine);

    return {
      message: 'Vacuna eliminada con éxito',
    };
  }

  // Alertas: vacunas cuya próxima dosis ya venció o vence en los próximos `days` días
  async findPendientes(days: number) {
    const today = this.getTodayDate();
    const allVaccines = await this.vaccineRepository.find();

    const pending = allVaccines
      .filter((vaccine) => Boolean(vaccine.proximaDosis))
      .map((vaccine) => {
        const diasRestantes = this.daysBetween(today, vaccine.proximaDosis!);
        return {
          ...vaccine,
          diasRestantes,
          estado: diasRestantes < 0 ? 'vencida' : 'proxima',
        };
      })
      .filter((vaccine) => vaccine.diasRestantes <= days)
      .sort((a, b) => a.diasRestantes - b.diasRestantes);

    return {
      message: `Vacunas vencidas o por aplicar en los próximos ${days} días`,
      total: pending.length,
      data: pending,
    };
  }

  private async findVaccineOrFail(id: string): Promise<VaccineEntity> {
    const vaccine = await this.vaccineRepository.findOne({ where: { id } });
    if (!vaccine) {
      throw new NotFoundException(`Vacuna con ID ${id} no encontrada`);
    }
    return vaccine;
  }

  private validateDates(fechaAplicacion: string, proximaDosis?: string) {
    if (fechaAplicacion.slice(0, 10) > this.getTodayDate()) {
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

  // Fecha local en formato YYYY-MM-DD
  private getTodayDate(): string {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
  }

  // Diferencia en días entre dos fechas YYYY-MM-DD
  private daysBetween(fromDate: string, toDate: string): number {
    const toUtcMs = (dateStr: string) => {
      const [year, month, day] = dateStr.slice(0, 10).split('-').map(Number);
      return Date.UTC(year, month - 1, day);
    };
    return Math.round((toUtcMs(toDate) - toUtcMs(fromDate)) / MS_PER_DAY);
  }
}