import { ref } from "vue";

const apiURL =
  "https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales";

export const getFields = () => {
  const fields = ref(null);
  const fieldsError = ref(null);

  const loadFields = async () => {
    try {
      let data = await fetch(
        apiURL + "?timezone=UTC&include_links=false&include_app_metas=false"
      );
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

  const loadRecords = async (page: number, limit: number) => {
    // console.log(page);
    try {
      let data = await fetch(
        apiURL +
          "/records?order_by=fecha_inicio%20desc%2C%20hora_ini%20desc%2C%20provincia%20asc&limit=" +
          limit +
          "&offset=" +
          (page - 1) * 10 +
          "&timezone=UTC&include_links=false&include_app_metas=false"
      );
      if (!data) {
        throw Error("no data");
      }
      const recordsData = await data.json();
      records.value = recordsData.results;
      totalCount.value = recordsData.total_count;
      numPages.value = Math.ceil(totalCount.value / limit);
      // console.log(records.value);
    } catch (err) {
      // error.value = err;
      console.log(recordsError.value);
    }
  };

  return { records, totalCount, numPages, recordsError, loadRecords };
};
