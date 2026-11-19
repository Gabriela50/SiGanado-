import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

// Código de PostgreSQL para violación de llave foránea
const FOREIGN_KEY_VIOLATION = '23503';

// Convierte el error de llave foránea (animalId que no existe) en un 400
@Catch(QueryFailedError)
export class ForeignKeyFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const code = (exception.driverError as { code?: string })?.code;

    if (code === FOREIGN_KEY_VIOLATION) {
      return super.catch(
        new BadRequestException('El animal indicado (animalId) no existe'),
        host,
      );
    }

    return super.catch(new InternalServerErrorException(), host);
  }
}
