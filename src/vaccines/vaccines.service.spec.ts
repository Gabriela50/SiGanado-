import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VaccinesService } from './vaccines.service';
import { VaccineEntity } from './entities/vaccine.entity';

// Repositorio falso en memoria para probar el servicio sin base de datos
const crearRepositorioFalso = () => {
  let registros: VaccineEntity[] = [];
  let contador = 0;

  return {
    create: (datos: Partial<VaccineEntity>) => ({ ...datos }) as VaccineEntity,
    merge: (entidad: VaccineEntity, cambios: Partial<VaccineEntity>) =>
      Object.assign(entidad, cambios),
    save: async (entidad: VaccineEntity) => {
      if (!entidad.id) {
        entidad.id = `vac-${++contador}`;
        registros.push(entidad);
      }
      return entidad;
    },
    find: async (opciones?: { where?: Partial<VaccineEntity> }) => {
      const filtro = opciones?.where ?? {};
      return registros.filter((r) =>
        Object.entries(filtro).every(
          ([campo, valor]) => r[campo as keyof VaccineEntity] === valor,
        ),
      );
    },
    findOne: async (opciones: { where: { id: string } }) =>
      registros.find((r) => r.id === opciones.where.id) ?? null,
    remove: async (entidad: VaccineEntity) => {
      registros = registros.filter((r) => r.id !== entidad.id);
      return entidad;
    },
  };
};

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
      providers: [
        VaccinesService,
        {
          provide: getRepositoryToken(VaccineEntity),
          useValue: crearRepositorioFalso(),
        },
      ],
    }).compile();

    service = module.get<VaccinesService>(VaccinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('registra una vacuna y la filtra por animal', async () => {
    await service.create(vacuna);
    await service.create({ ...vacuna, animalId: 'anim-002' });

    expect((await service.findAll()).total).toBe(2);
    expect((await service.findAll('anim-001')).total).toBe(1);
  });

  it('rechaza una próxima dosis anterior a la aplicación', async () => {
    await expect(
      service.create({ ...vacuna, proximaDosis: enDias(-200) }),
    ).rejects.toThrow(BadRequestException);
  });

  it('rechaza una fecha de aplicación futura', async () => {
    await expect(
      service.create({
        ...vacuna,
        fechaAplicacion: enDias(5),
        proximaDosis: undefined,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('lanza NotFoundException si la vacuna no existe', async () => {
    await expect(service.findById('no-existe')).rejects.toThrow(
      NotFoundException,
    );
    await expect(service.delete('no-existe')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('lista vencidas y próximas dentro de la ventana, ordenadas', async () => {
    await service.create({
      ...vacuna,
      nombreVacuna: 'Rabia',
      proximaDosis: enDias(-3),
    });
    await service.create(vacuna);
    await service.create({
      ...vacuna,
      nombreVacuna: 'Carbón',
      proximaDosis: enDias(90),
    });

    const { data } = await service.findPendientes(30);

    expect(
      data.map((v) => [v.nombreVacuna, v.estado, v.diasRestantes]),
    ).toEqual([
      ['Rabia', 'vencida', -3],
      ['Aftosa', 'proxima', 10],
    ]);
  });
});
