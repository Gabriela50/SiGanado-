export interface Vaccine {
  id: string;
  animalId: string;        // ID del animal vacunado
  nombreVacuna: string;    // Ej: Aftosa, Brucelosis, Rabia, Carbón bacteridiano
  dosis: number;           // Número de dosis aplicada (1 = primera, 2 = refuerzo...)
  fechaAplicacion: string; // Fecha en la que se aplicó (YYYY-MM-DD)
  proximaDosis?: string;   // Fecha de la siguiente dosis o refuerzo (YYYY-MM-DD)
  lote?: string;           // Lote del biológico aplicado
  responsable: string;     // Persona que aplicó la vacuna
  observaciones?: string;
}
