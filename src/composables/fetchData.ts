import { ref } from "vue";

const apiURL =
  "https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales";

export interface Position {
  lat: number;
  lng: number;
}

interface Filters {
  page: number;
  limit: number;
  provincia: string;
  situacion: string;
  nivel: string;
  causa: string;
  radius?: number;
  lat?: number;
  lon?: number;
}

//------------------------------------
// useFields
//------------------------------------
// This function is called for retrieving
// the fields from incendios-forestales,
// in order to properly display the table
// fields
//------------------------------------
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
      console.log(fieldsError.value);
    }
  };

  return { fields, fieldsError, loadFields };
};

//------------------------------------
// useRecords
//------------------------------------
// This function is called for retrieving
// the fires records fromn the database.
// Optionally, it can return an extra
// parameter, markers, which is properly
// formatted for the component used to
// display the Google Maps map.
//------------------------------------
export const useRecords = () => {
  const records = ref(null);
  const markers = ref<Position[]>();
  const recordsError = ref(null);
  const totalCount = ref(0);
  const numPages = ref(0);

  //------------------------------------
  // getQuery
  //------------------------------------
  // This function returns the query string
  // composed with all the filters received
  //------------------------------------
  const getQuery = (filters: Filters) => {
    let query =
      apiURL +
      "/records?order_by=fecha_inicio%20desc%2C%20hora_ini%20desc%2C%20provincia%20asc&limit=" +
      filters.limit +
      "&offset=" +
      (filters.page - 1) * 10 +
      "&timezone=UTC&include_links=false&include_app_metas=false";

    // Extend the query if certain filters were passed
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
        "&where=posicion%20IS%20NOT%20NULL" +
        "&select=posicion&where=distance%28posicion%2C%20geom%27POINT%28" +
        filters.lon +
        "%20" +
        filters.lat +
        "%29%27%2C%20" +
        filters.radius +
        "km%29";
    }
    return query;
  };

  //------------------------------------
  // loadRecords
  //------------------------------------
  // This is the function that actually
  // retrieves data from the database
  //------------------------------------
  const loadRecords = async (filters: Filters) => {
    try {
      let query = getQuery(filters);

      // Query the database
      let data = await fetch(query);
      if (!data) {
        throw Error("no data");
      }
      const recordsData = await data.json();

      // Update the variables that are used both in the Table and Map views
      records.value = recordsData.results;
      totalCount.value = recordsData.total_count;
      numPages.value = Math.ceil(totalCount.value / filters.limit);
      // console.log(records);

      // If radius was provided, it means we're in the
      // map view, and therefore we return the markers to
      // be displayed in the map
      if (filters.radius) {
        let auxMarkers: Position[] = [];
        // Google Maps works with coordinates in the format {lat, lng}
        // while our database returns {lat, lon}, so we create a new
        // array before assigning it to markers
        for (let i = 0; i < recordsData.results.length; i++) {
          // console.log(i);
          const record = recordsData.results[i];
          const auxMarker = {
            lat: record.posicion.lat,
            lng: record.posicion.lon,
          };
          // console.log(auxMarker);
          auxMarkers.push(auxMarker);
        }
        markers.value = auxMarkers;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { records, markers, totalCount, numPages, recordsError, loadRecords };
};
