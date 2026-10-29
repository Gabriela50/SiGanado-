export interface HealthRecord {
    id: string;
    animalId: string;       // ID del animal asociado al registro médico
    diagnostico: string;    // Diagnóstico o motivo de la consulta/control
    tratamiento: string;    // Tratamiento aplicado o receta médica
    veterinario: string;    // Nombre del profesional a cargo
    fechaRevision: string;  // Fecha en la que se realizó la revisión
    observaciones?: string; // Notas adicionales o recomendaciones
  }