// Paso 1: Agrupar calificaciones por formación
export const formationGroups = (data) => {
  return data.reduce((acc, item) => {
    if (!acc[item.formation]) {
      acc[item.formation] = [];
    }
    acc[item.formation].push(item.qualification);
    return acc;
  }, {});
};

// Paso 2: Calcular el promedio de las calificaciones para cada formación
export const formationAverages = (data) => {
  const groups = formationGroups(data);
  return Object.keys(groups).map(formation => {
    const totalQualifications = groups[formation].reduce((sum, qualification) => sum + qualification, 0);
    const averageQualification = totalQualifications / groups[formation].length;
    return {
      formation,
      averageQualification
    };
  });
};


export const calculateAveragesCombats = (data) => {
  const totals = data.reduce((acc, item) => {
    acc.q_enemies += item.q_enemies;
    acc.q_friend_deaths += item.q_friend_deaths;
    acc.q_enemy_deaths += item.q_enemy_deaths;
    acc.qualification += item.qualification;
    acc.totalSeconds += item.totalSeconds;
    acc.count += 1;
    return acc;
  }, {
    q_enemies: 0,
    q_friend_deaths: 0,
    q_enemy_deaths: 0,
    qualification: 0,
    totalSeconds: 0,
    count: 0
  });

  const chartData = [
    { name: "Promedio de Enemigos", value: totals.q_enemies / totals.count },
    { name: "Promedio de Muertes Amigas", value: totals.q_friend_deaths / totals.count },
    { name: "Promedio de Muertes Enemigas", value: totals.q_enemy_deaths / totals.count },
    { name: "Promedio de la cafilificacion", value: totals.qualification / totals.count },
    //{ name: "Promedio de segundos", value: totals.totalSeconds / totals.count },
  ]

  return chartData;
};

export const calculateTamPatrols = (data) => {

  const chartData = [
    { name: "Patrullajes", value: data.length, valueFinal: 150, fill: "hsl(var(--chart-2))" },
  ]
  return chartData;

}

export const getPatrolsLastSixMonths = (data) => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const result = {};

  data.forEach(patrol => {
    const createdDate = new Date(patrol.created);
    if (createdDate >= sixMonthsAgo) {
      const month = months[createdDate.getMonth()];
      if (!result[month]) {
        result[month] = { month: month, patrols: 0 };
      }
      result[month].patrols += 1;
    }
  });

  const sortedResult = Object.values(result).sort((a, b) => {
    return months.indexOf(a.month) - months.indexOf(b.month);
  });

  return sortedResult;
};


export const calculateAveragesRecognitions = (data) => {
  const totals = data.reduce((acc, item) => {
    acc.formationsQualification += item.formationsQualification;
    acc.techniquesRecognitionsQualifications += item.techniquesRecognitionsQualifications;
    acc.qualification += item.qualification;
    acc.count += 1;
    return acc;
  }, {
    formationsQualification: 0,
    techniquesRecognitionsQualifications: 0,
    qualification: 0,
    count: 0
  });

  const chartData = [
    { name: "Promedio en Formaciones", value: totals.formationsQualification / totals.count },
    { name: "Promedio en Tecnicas de Reconocimiento", value: totals.techniquesRecognitionsQualifications / totals.count },
    { name: "Promedio de Calificacion", value: totals.qualification / totals.count },
  ]

  return chartData;
};