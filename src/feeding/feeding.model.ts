export interface Feeding {
  id: string;
  animalId: string;      // ID del animal o lote al que se le da el alimento
  tipoAlimento: string;  // Ej: Pasto de corte,ala concentrado, silo
  cantidadKg: number;    // Cantidad en kilogramos
  fechaRegistro: string; // Fecha en la que se suministró
  observaciones?: string;
}