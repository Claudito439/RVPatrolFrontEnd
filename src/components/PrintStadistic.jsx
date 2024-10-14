import { Printer } from "lucide-react"; // Importa el ícono de lucide-react

export const PrintButtonE = () => {
  const handlePrint = () => {
    window.print(); // Utiliza la función nativa para imprimir toda la pantalla
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg"
    >
      <Printer className="mr-2" />
      Imprimir
    </button>
  );
};
