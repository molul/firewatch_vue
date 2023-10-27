import { ref } from "vue";

const apiURL =
  "https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales";

interface Position {
  lat: number;
  lng: number;
}

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
  const markers = ref<Position[]>();
  const recordsError = ref(null);
  const totalCount = ref(0);
  const numPages = ref(0);

  const loadRecords = async (filters: {
    page: number;
    limit: number;
    provincia: string;
    situacion: string;
    nivel: string;
    causa: string;
    radius?: number;
    lat?: number;
    lon?: number;
  }) => {
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
      if (filters.radius) {
        query +=
          "&select=posicion&where=distance%28posicion%2C%20geom%27POINT%28" +
          filters.lon +
          "%20" +
          filters.lat +
          "%29%27%2C%20" +
          filters.radius +
          "km%29";
      }

      let data = await fetch(query);
      if (!data) {
        throw Error("no data");
      }
      const recordsData = await data.json();
      records.value = recordsData.results;
      totalCount.value = recordsData.total_count;
      numPages.value = Math.ceil(totalCount.value / filters.limit);

      if (filters.radius) {
        // console.log(recordsData.results);
        let auxMarkers: Position[] = [];
        for (let i = 0; i < recordsData.results.length; i++) {
          const record = recordsData.results[i];
          const auxMarker = {
            lat: record.posicion.lat,
            lng: record.posicion.lon,
          };
          auxMarkers.push(auxMarker);
        }
        // console.log(aux);
        markers.value = auxMarkers;
      }
      // console.log(records.value);
    } catch (err) {
      console.log(err);
      // error.value = err;
      // console.log(recordsError.value);
    }
  };

  return { records, markers, totalCount, numPages, recordsError, loadRecords };
};
