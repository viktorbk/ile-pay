<template>
  <div class="q-pa-sm" style="">
    <q-card>
      <q-card-section style="background-color: #eee">
        <div class="text-h6">Projects</div>
      </q-card-section>
      <q-separator />
      <div class="q-pl-sm q-pt-sm">
        <q-btn
          color="green"
          icon="add"
          label="Add new Project"
          @click="addNew"
        />
      </div>
      <q-card-section>
        <DxDataGrid
          :data-source="projects"
          key-expr="nr"
          :show-column-lines="true"
          :show-row-lines="true"
          :row-alternation-enabled="true"
          :show-borders="true"
          @row-removed="deleteProject"
        >
          <DxEditing
            :allow-updating="true"
            :allow-deleting="true"
            :allow-adding="false"
            mode="row"
          />
          <DxColumn :width="90" data-field="nr" caption="Nr"> </DxColumn>
          <DxColumn :width="125" data-field="company" caption="Company">
          </DxColumn>
          <DxColumn data-field="name" caption="Name/Tour"> </DxColumn>
          <DxColumn :width="165" data-field="description" caption="Description">
          </DxColumn>
          <DxColumn :width="105" data-field="from" caption="From"> </DxColumn>
          <DxColumn :width="105" data-field="to" caption="To"> </DxColumn>
          <DxColumn :width="200" data-field="customer" caption="Customer">
          </DxColumn>
          <DxColumn :width="105" data-field="price" caption="Price"> </DxColumn>
          <DxColumn :width="105" data-field="commission" caption="Commission">
          </DxColumn>
        </DxDataGrid>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
const router = useRouter();

const $q = useQuasar();
const projects = ref([]);

const addNew = () => {
  router.push({ name: "register" });
};

const getCars = () => {
  api
    .get("/projects")
    .then((response) => {
      projects.value = response.data;
    })
    .catch(() => {
      $q.notify({
        color: "negative",
        position: "top",
        message: "Loading failed",
        icon: "report_problem",
      });
    });
};

onMounted(() => {
  getCars();
});

const deleteProject = (e) => {
  console.log(e.key);
  api
    .delete(`/projects/${e.data._id}`)
    .then((response) => {
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Deleted",
      });
    })
    .catch(() => {
      $q.notify({
        color: "negative",
        position: "top",
        message: "Loading failed",
        icon: "report_problem",
      });
    });
};
</script>
