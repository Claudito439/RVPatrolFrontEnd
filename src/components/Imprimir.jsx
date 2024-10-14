import { Printer } from "lucide-react"; // Importa el ícono de lucide-react

export const PrintButton = () => {
  const handlePrint = () => {
    const printContent = document.getElementById("printable-area").innerHTML; // Obtiene el contenido del div con el id 'print-area'
    
    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Imprimir</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              zoom: 0.75; /* Reduce el tamaño global de la impresión */
              color-adjust: exact; /* Mantiene los colores */
              -webkit-print-color-adjust: exact; /* Asegura que los colores se impriman */
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            table, th, td {
              border: 1px solid black;
              padding: 8px;
            }
            th {
              background-color: #007bff; /* Azul para encabezados */
              color: white; /* Texto blanco */
              padding: 8px;
            }
            td {
              color: black;
              padding: 8px;
            }
            thead {
              display: table-header-group; /* Repite los encabezados en cada página impresa */
            }
            tr {
              page-break-inside: avoid; /* Evita saltos de página dentro de una fila */
            }
            @media print {
              /* Estilos adicionales específicos para la impresión */
              body {
                font-size: 12px; /* Reduce el tamaño del texto */
              }
              th, td {
                padding: 6px; /* Ajusta el padding para que quepa más contenido */
              }
              th {
                background-color: #007bff !important; /* Asegura el color azul para encabezados al imprimir */
                color: white !important; /* Texto blanco */
              }
              
              .no-print {
                display: none !important; /* Oculta elementos que no se deben imprimir */
              }
            }
          </style>
        </head>
        <body>
          <div id="print-area">
            ${printContent}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg"
    >
      <Printer className="mr-2" /> {/* Usa el ícono de impresora de lucide-react */}
      Imprimir
    </button>
  );
};
