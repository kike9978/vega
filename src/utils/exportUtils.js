import * as XLSX from 'xlsx';

export function exportToExcel(data, filename = 'ganado') {
  // Transform data for export
  const exportData = data.map(cow => ({
    'Nombre': cow.name,
    'Sexo': cow.sex === 'male' ? 'Macho' : 'Hembra',
    'UPP': cow.upp,
    'Fierro': cow.mark,
    'Registro': cow.isRegistered ? 'Registrado' : 'Sin registrar',
    'Arete': cow.hasEaring ? cow.earingId : 'Sin arete',
    'Fecha de Nacimiento': cow.birthDate.toLocaleDateString(),
    'Cruza': cow.breed
  }));

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(exportData);

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Ganado');

  // Generate file
  XLSX.writeFile(workbook, `${filename}.xlsx`);
} 