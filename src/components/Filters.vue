<script lang="ts">
import { defineComponent, ref } from "vue";
import Dropdown from "../components/Dropdown.vue";
import { provinces } from "../data/provinces";
import { situations } from "../data/situations";
import { levels } from "../data/levels";
import { causes } from "../data/causes";

export default defineComponent({
  name: "Filters",
  components: { Dropdown },
  setup() {
    const selectedProvince = ref("");
    const selectedCurrentSituation = ref("");
    const selectedLevel = ref("");
    const selectedCause = ref("");
    const nombreFiltro = ref("");
    const noNameError = ref("");

    const guardarFiltro = () => {
      if (nombreFiltro.value === "") {
        noNameError.value =
          nombreFiltro.value === ""
            ? "Por favor, escriba un nombre para el filtro"
            : "";
      } else {
        noNameError.value = "";

        const datos = {
          provincia: selectedProvince.value,
          situacion: selectedCurrentSituation.value,
          nivel: selectedLevel.value,
          causa: selectedCause.value,
        };

        const datosJSON = JSON.stringify(datos);

        localStorage.setItem(nombreFiltro.value, datosJSON);
      }
    };

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
      noNameError,
    };
  },
});
</script>

<template>
  <div>
    <div class="flex flex-col gap-4">
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
    </div>
    <div v-if="noNameError" class="flex justify-center text-red-600 font-bold">
      {{ noNameError }}
    </div>
  </div>
</template>
