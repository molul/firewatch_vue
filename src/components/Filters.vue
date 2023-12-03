<script setup lang="ts">
import { ref, onMounted } from "vue";
import Dropdown from "./Dropdown.vue";
import { provinces } from "../data/provinces";
import { situations } from "../data/situations";
import { levels } from "../data/levels";
import { causes } from "../data/causes";

interface Option {
  value: string;
  label: string;
}

const selectedProvince = ref("");
const selectedCurrentSituation = ref("");
const selectedLevel = ref("");
const selectedCause = ref("");
const nombreFiltro = ref("");
const savePresetMessage = ref("");

const filters = ref<Option[]>([]);
const filterPreffix = "cfp_"; // that's "cesefor filter preset" ;)
// const selectedFilter = ref("");

const updateCause = (value: string) => {
  selectedCause.value = value;
};

const guardarFiltro = () => {
  if (nombreFiltro.value === "") {
    savePresetMessage.value =
      nombreFiltro.value === ""
        ? "Por favor, escriba un nombre para el filtro"
        : "";
  } else {
    savePresetMessage.value = "";
    if (
      selectedProvince.value === "" &&
      selectedCurrentSituation.value === "" &&
      selectedLevel.value === "" &&
      selectedCause.value === ""
    ) {
      savePresetMessage.value =
        "El preset no se ha guardado porque no se ha seleccionado ninguna opción en los filtros";
    } else {
      savePresetMessage.value = "";
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
};

// const loadFilter = (data: string) => {
//   const options = JSON.parse(data);
//   selectedProvince.value = options.provincia;
//   selectedCurrentSituation.value = options.situacion;
//   selectedLevel.value = options.nivel;
//   selectedCause.value = options.causa;
// };

onMounted(() => {
  loadFiltersFromLocalStorage();
});
</script>

<template>
  <div>
    <div
      class="flex flex-col gap-4 my-4 border border-zinc-400 p-4 md:p-8 rounded bg-white bg-opacity-50"
    >
      <div class="font-bold uppercase text-center text-xl">Filtros</div>
      <!-- Filters -->
      <div
        class="flex flex-col md:flex-row gap-2 items-start md:items-center justify-center flex-wrap"
      >
        <Dropdown
          id="selectProvincia"
          :select="{ selectedProvince }"
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
          id="selectSituation"
          :select="{ selectedCurrentSituation }"
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
          id="selectNivel"
          :select="{ selectedLevel }"
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
          id="selectCausa"
          :selectedValue="selectedCause"
          :data="causes"
          label="Causa probable"
          @hasChanged="
            (value) => {
              updateCause(value);
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
        <div
          class="flex flex-col md:flex-row gap-2 items-start md:items-center justify-center"
        >
          <div class="font-semibold">Guardar filtro</div>
          <div class="w-full md:w-auto">
            <input
              class="p-2 rounded border border-zinc-400 w-full md:w-auto"
              type="text"
              ref="myInput"
              v-model="nombreFiltro"
            />
          </div>
          <div class="">
            <button
              @click="guardarFiltro"
              class="bg-primary hover:bg-primary-light text-secondary uppercase font-bold px-4 py-2 rounded transition-colors shadow-md"
            >
              Guardar
            </button>
          </div>
        </div>
        <div
          v-if="savePresetMessage"
          class="flex justify-center text-red-600 font-bold"
        >
          {{ savePresetMessage }}
        </div>
      </div>
    </div>
  </div>
</template>
