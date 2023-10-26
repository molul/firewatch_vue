<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Dropdown from "../components/Dropdown.vue";
import { provinces } from "../data/provinces";
import { situations } from "../data/situations";
import { levels } from "../data/levels";
import { causes } from "../data/causes";

interface Option {
  value: string;
  label: string;
}

export default defineComponent({
  name: "Filters",
  components: { Dropdown },
  setup() {
    const selectedProvince = ref("");
    const selectedCurrentSituation = ref("");
    const selectedLevel = ref("");
    const selectedCause = ref("");
    const nombreFiltro = ref("");
    const savePresetError = ref("");

    const filters = ref<Option[]>([]);
    const filterPreffix = "cfp_"; // that's "cesefor filter preset" ;)
    const selectedFilter = ref("");

    const guardarFiltro = () => {
      if (nombreFiltro.value === "") {
        savePresetError.value =
          nombreFiltro.value === ""
            ? "Por favor, escriba un nombre para el filtro"
            : "";
      } else {
        savePresetError.value = "";

        if (
          selectedProvince.value === "" &&
          selectedCurrentSituation.value === "" &&
          selectedLevel.value === "" &&
          selectedCause.value === ""
        ) {
          savePresetError.value =
            "El preset no se ha guardado porque no se ha seleccionado ninguna opción en los filtros";
        } else {
          savePresetError.value = "";
          const datos = {
            provincia: selectedProvince.value,
            situacion: selectedCurrentSituation.value,
            nivel: selectedLevel.value,
            causa: selectedCause.value,
          };

          const datosJSON = JSON.stringify(datos);

          localStorage.setItem(filterPreffix + nombreFiltro.value, datosJSON);
          nombreFiltro.value = "";
          loadFiltersFromLocalStorage();
        }
      }
    };

    const loadFiltersFromLocalStorage = () => {
      const allLocalStorageEntries = { ...localStorage };
      const filteredEntries = Object.entries(allLocalStorageEntries).filter(
        ([key]) => key.startsWith(filterPreffix)
      );

      filters.value = filteredEntries.map(([key, value]) => ({
        label: key,
        value: value,
      }));
      console.log(filters.value);
    };

    const loadFilter = (data: string) => {
      console.log(data);
    };

    onMounted(() => {
      loadFiltersFromLocalStorage();
    });

    return {
      selectedProvince,
      provinces,
      selectedCurrentSituation,
      situations,
      levels,
      selectedLevel,
      causes,
      selectedCause,
      nombreFiltro,
      guardarFiltro,
      savePresetError,
      selectedFilter,
      filters,
      loadFilter,
    };
  },
});
</script>

<template>
  <div>
    <div
      class="flex flex-col gap-8 my-4 border border-zinc-400 p-8 rounded bg-white bg-opacity-50"
    >
      <!-- Filters -->
      <div class="flex gap-2 items-center justify-center flex-wrap">
        <div>Filtros:</div>
        <!-- <span> Provincia: {{ selected }}</span> -->
        <Dropdown
          :selected="{ selectedProvince }"
          :data="provinces"
          label="Provincia"
          @hasChanged="
            (value) => {
              selectedProvince = value;
              $emit('callback', { field: 'provincia', value: value });
            }
          "
        />

        <Dropdown
          :selected="{ selectedCurrentSituation }"
          :data="situations"
          label="Situación"
          @hasChanged="
            (value) => {
              selectedCurrentSituation = value;
              $emit('callback', { field: 'situacion_actual', value: value });
            }
          "
        />

        <Dropdown
          :selected="{ selectedLevel }"
          :data="levels"
          label="Nivel máximo"
          @hasChanged="
            (value) => {
              selectedLevel = value;
              $emit('callback', {
                field: 'nivel_maximo_alcanzado',
                value: value,
              });
            }
          "
        />

        <Dropdown
          :selected="{ selectedCause }"
          :data="causes"
          label="Causa probable"
          @hasChanged="
            (value) => {
              selectedCause = value;
              $emit('callback', {
                field: 'causa_probable',
                value: value,
              });
            }
          "
        />
      </div>
      <!-- Save filter -->
      <div>
        <div class="flex gap-2 items-center justify-center">
          <div>Guardar filtro</div>
          <div class="">
            <input
              class="p-2 rounded border border-zinc-400 w-96"
              type="text"
              ref="myInput"
              v-model="nombreFiltro"
            />
          </div>
          <div class="bg-primary p-2 rounded">
            <button
              @click="guardarFiltro"
              class="bg-black bg-opacity-20 px-2 py-1 rounded text-white"
            >
              Guardar
            </button>
          </div>
        </div>
        <div
          v-if="savePresetError"
          class="flex justify-center text-red-600 font-bold"
        >
          {{ savePresetError }}
        </div>
      </div>
      <!-- Load filter -->
      <div class="flex justify-center items-center gap-2">
        <Dropdown
          :selected="{ selectedFilter }"
          :data="filters"
          label="Cargar filtro"
          @hasChanged="
            (value) => {
              selectedFilter = value;
              loadFilter(value);
            }
          "
        />

        <!-- <p>Selected Value: {{ selectedFilter }}</p> -->
      </div>
    </div>
  </div>
</template>
