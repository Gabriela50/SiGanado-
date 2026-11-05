export interface TrackingRecord {
  id: string;
  animalId: string;       // ID del animal al que se le hace seguimiento
  loteUbicacion: string;  // Nombre del lote, potrero o predio actual
  coordenadasGPS?: string;// Opcional: Latitud y longitud aproximada
  fechaMovimiento: string;// Fecha en la que ingresó a esta ubicación
  responsable: string;    // Persona encargada del lote o traslado
  observaciones?: string; // Notas adicionales sobre el estado o traslado
}