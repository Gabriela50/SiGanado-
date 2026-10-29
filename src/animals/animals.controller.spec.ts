import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';

describe('AnimalsController: filtro por raza', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AnimalsController],
      providers: [AnimalsService],
    }).compile();
    const service = module.get(AnimalsService);
    for (const raza of ['Brahman', 'Holstein']) {
      service.create({
        name: `Animal ${raza}`,
        raza,
        edad: 24,
        peso: 350,
        sexo: 'hembra',
        estadoSalud: 'sano',
      });
    }
    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app?.close();
  });

  it('lista todos los animales sin filtro', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/animals')
      .expect(200);
    expect(body.map((animal: { raza: string }) => animal.raza)).toEqual([
      'Brahman',
      'Holstein',
    ]);
  });

  it('filtra sin distinguir mayúsculas y minúsculas', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/animals?raza=bRaHmAn')
      .expect(200);
    expect(body).toHaveLength(1);
    expect(body[0].raza).toBe('Brahman');
  });

  it('devuelve una lista vacía si la raza no existe', async () => {
    await request(app.getHttpServer())
      .get('/animals?raza=Angus')
      .expect(200)
      .expect([]);
  });

  it('lista todos los animales si el filtro está vacío', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/animals?raza=')
      .expect(200);
    expect(body).toHaveLength(2);
  });
});
