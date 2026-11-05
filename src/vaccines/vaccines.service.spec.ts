import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { VaccinesService } from './vaccines.service';

describe('VaccinesService', () => {
  let service: VaccinesService;

  // Fecha YYYY-MM-DD relativa a hoy (negativo = días atrás).
  const enDias = (dias: number) => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + dias);
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${fecha.getFullYear()}-${mes}-${dia}`;
  };

  const vacuna = {
    animalId: 'anim-001',
    nombreVacuna: 'Aftosa',
    dosis: 1,
    fechaAplicacion: enDias(-170),
    proximaDosis: enDias(10),
    responsable: 'Juan Pérez',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VaccinesService],
    }).compile();

    service = module.get<VaccinesService>(VaccinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('registra una vacuna y la filtra por animal', () => {
    service.create(vacuna);
    service.create({ ...vacuna, animalId: 'anim-002' });

    expect(service.findAll().total).toBe(2);
    expect(service.findAll('anim-001').total).toBe(1);
  });

  it('rechaza una próxima dosis anterior a la aplicación', () => {
    expect(() =>
      service.create({ ...vacuna, proximaDosis: enDias(-200) }),
    ).toThrow(BadRequestException);
  });

  it('rechaza una fecha de aplicación futura', () => {
    expect(() =>
      service.create({ ...vacuna, fechaAplicacion: enDias(5), proximaDosis: undefined }),
    ).toThrow(BadRequestException);
  });

  it('lanza NotFoundException si la vacuna no existe', () => {
    expect(() => service.findById('no-existe')).toThrow(NotFoundException);
    expect(() => service.delete('no-existe')).toThrow(NotFoundException);
  });

  it('lista vencidas y próximas dentro de la ventana, ordenadas', () => {
    service.create({ ...vacuna, nombreVacuna: 'Rabia', proximaDosis: enDias(-3) });
    service.create(vacuna);
    service.create({ ...vacuna, nombreVacuna: 'Carbón', proximaDosis: enDias(90) });

    const { data } = service.findPendientes(30);

    expect(data.map((v) => [v.nombreVacuna, v.estado, v.diasRestantes])).toEqual([
      ['Rabia', 'vencida', -3],
      ['Aftosa', 'proxima', 10],
    ]);
  });
});
