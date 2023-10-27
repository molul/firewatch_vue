import { ref } from "vue";

const apiURL =
  "https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales";

export const useFields = () => {
  const fields = ref(null);
  const fieldsError = ref(null);

  const loadFields = async () => {
    try {
      let query =
        apiURL + "?timezone=UTC&include_links=false&include_app_metas=false";
      let data = await fetch(query);
      if (!data) {
        throw Error("no data");
      }
      const dataset = await data.json();
      fields.value = dataset.fields;
    } catch (err) {
      console.log(err);
      // fields2Error.value = err.message;
      console.log(fieldsError.value);
    }
  };

  return { fields, fieldsError, loadFields };
};

export const getRecords = () => {
  const records = ref(null);
  const recordsError = ref(null);
  const totalCount = ref(0);
  const numPages = ref(0);

  const loadRecords = async (
    filters: {
      page: number;
      limit: number;
      provincia: string;
      situacion: string;
      nivel: string;
      causa: string;
    },
    radius?: number,
    lat?: number,
    lon?: number
  ) => {
    // console.log("causa: " + filters.causa);
    // console.log(page);
    try {
      let query =
        apiURL +
        "/records?order_by=fecha_inicio%20desc%2C%20hora_ini%20desc%2C%20provincia%20asc&limit=" +
        filters.limit +
        "&offset=" +
        (filters.page - 1) * 10 +
        "&timezone=UTC&include_links=false&include_app_metas=false";

      if (filters.provincia !== "") {
        query += "&where=provincia%20LIKE%20%27" + filters.provincia + "%27";
      }
      if (filters.situacion !== "") {
        query += "&where=situacion_actual=%27" + filters.situacion + "%27";
      }
      if (filters.nivel !== "") {
        query += "&where=nivel=%27" + filters.nivel + "%27";
      }
      if (filters.causa !== "") {
        query += "&where=causa_probable%20LIKE%20%27" + filters.causa + "%27";
      }
      // "&where=causa_probable%20LIKE%20%27NEGLIGENCIAS%27"

      // console.log(query);
      let data = await fetch(query);
      if (!data) {
        throw Error("no data");
      }
      const recordsData = await data.json();
      records.value = recordsData.results;
      totalCount.value = recordsData.total_count;
      numPages.value = Math.ceil(totalCount.value / filters.limit);
      // console.log(records.value);
    } catch (err) {
      console.log(err);
      // error.value = err;
      // console.log(recordsError.value);
    }
  };

  return { records, totalCount, numPages, recordsError, loadRecords };
};

export const getFires = (radius: number, lat: number, lon: number) => {
  let firesList = null;
  // console.log(records);
  const distance = calculateDistance(40.7128, -74.006, 34.0522, -118.2437);
  console.log("La distancia es " + distance + " km");

  return firesList;
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const earthRadius = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
};
