import { ref } from "vue";

const apiURL =
  "https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales";

export const getFields = () => {
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

  const loadRecords = async (filters: {
    page: number;
    limit: number;
    provincia: string;
    situacion: string;
    nivel: string;
    causa: string;
  }) => {
    console.log("causa: " + filters.causa);
    // console.log(page);
    try {
      let query =
        apiURL +
        "/records?order_by=fecha_inicio%20desc%2C%20hora_ini%20desc%2C%20provincia%20asc&limit=" +
        filters.limit +
        "&offset=" +
        (filters.page - 1) * 10 +
        "&timezone=UTC&include_links=false&include_app_metas=false";

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
      // error.value = err;
      // console.log(recordsError.value);
    }
  };

  return { records, totalCount, numPages, recordsError, loadRecords };
};
