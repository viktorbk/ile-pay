<template>
  <div class="q-pa-md" style="max-width: 500px">
    <q-card>
      <q-tabs v-model="tab" class="text-teal">
        <q-tab name="customer" icon="mail" label="Customer" />
        <q-tab name="tours" icon="alarm" label="Tours" />
      </q-tabs>
      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="customer">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              dense
              v-model="firstname"
              icon="person"
              label="Firstname of customer *"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            >
              <template v-slot:before>
                <q-icon name="person" />
              </template>
            </q-input>

            <q-input
              filled
              dense
              v-model="lastname"
              label="Lastname of customer *"
              icon="add"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            >
              <template v-slot:before>
                <q-icon name="person" />
              </template>
            </q-input>

            <q-input
              filled
              dense
              v-model="email"
              label="Email of customer *"
              lazy-rules
              :rules="[
                (val, rules) =>
                  rules.email(val) || 'Please enter a valid email address',
              ]"
            >
              <template v-slot:before>
                <q-icon name="email" />
              </template>
            </q-input>

            <q-input
              filled
              dense
              v-model="mobile"
              label="Mobile of customer"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length < 6) || 'Number must be bigger than 6',
              ]"
            >
              <template v-slot:before>
                <q-icon name="phone" />
              </template>
            </q-input>
          </q-form>
        </q-tab-panel>

        <q-tab-panel name="tours">
          <q-input
            filled
            dense
            v-model="projectName"
            label="Project name"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length < 6) || 'Number must be bigger than 6',
            ]"
          >
            <template v-slot:before>
              <i class="las la-project-diagram"></i>
            </template>
          </q-input>

          <div class="row">
            <div class="col">
              <q-input
                filled
                dense
                v-model="dateFrom"
                hint="Startdate"
                :rules="['date']"
              >
                <template v-slot:before>
                  <i class="las la-calendar"></i>
                </template>

                <template v-slot:append>
                  <div class="row">
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="dateFrom">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </div>
                </template>
              </q-input>
            </div>

            <div class="col">
              <q-input
                filled
                dense
                v-model="dateTo"
                hint="Enddate"
                :rules="['date']"
              >
                <template v-slot:before>
                  <i class="las la-calendar"></i>
                </template>

                <template v-slot:append>
                  <div class="row">
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="dateTo">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </div>
                </template>
              </q-input>
            </div>
          </div>

          <div class="q-pa-sm">
            <q-card>
              <DxDataGrid
                :data-source="tours"
                key-expr="id"
                :show-column-lines="true"
                :show-row-lines="true"
                :row-alternation-enabled="true"
                :show-borders="true"
              >
                <DxEditing
                  :allow-updating="true"
                  :allow-deleting="true"
                  :allow-adding="true"
                  mode="row"
                />
                <DxColumn :width="125" data-field="tourId" caption="Tour">
                  <DxLookup
                    :data-source="alltours"
                    display-expr="name"
                    value-expr="id"
                  />
                </DxColumn>
                <DxColumn data-field="price" />

                <DxSummary>
                  <DxTotalItem column="price" summary-type="sum" />
                </DxSummary>
              </DxDataGrid>
            </q-card>
          </div>

          <q-toggle v-model="room" label="Book the amount to the room?" />
          <q-input
            v-if="room"
            filled
            dense
            v-model="roomNr"
            label="Booking nr"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Please type amount',
              (val) =>
                (val > 0 && val < 1000000) || 'Please type a real amount',
            ]"
          >
            <template v-slot:before>
              <q-icon name="las la-bed" />
            </template>
          </q-input>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <div class="q-pt-md">
      <q-btn
        label="Save Project"
        type="submit"
        color="green"
        @click="saveProject"
      />
      <q-btn
        label="Go Back"
        type="reset"
        color="primary"
        flat
        class="q-ml-sm"
        @click="goHome"
      />
    </div>
    <q-dialog v-model="addDialog">
      <q-card class="my-card">
        <q-card-section> </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Reserve" />
          <q-btn v-close-popup flat color="primary" round icon="event" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "boot/axios";

const self = this;

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const firstname = ref(null);
    const lastname = ref(null);
    const amount = ref(null);
    const room = ref(false);
    const roomNr = ref(null);
    const email = ref(null);
    const mobile = ref(null);
    const tab = ref("customer");
    const projectName = ref(lastname);
    const dateFrom = ref("yyyy-mm-dd");
    const dateTo = ref("yyyy-mm-dd");

    return {
      firstname,
      lastname,
      amount,
      room,
      email,
      mobile,
      roomNr,
      tab,
      projectName,
      dateFrom,
      dateTo,
      alltours: [
        { id: 1000, name: "Golden Circle", price: 4500 },
        { id: 2000, name: "Airport", price: 2500 },
      ],
      tours: [],
      /*       tours: [
        { id: 1, tourId: 1000, price: 4500 },
        { id: 2, tourId: 2000, price: 2500 },
      ], */
      columns: ref(["id", "tour", "price"]),
      addDialog: ref(false),

      goHome() {
        router.push({ name: "home" });
      },

      saveProject() {
        const fr = new Date(dateFrom.value);
        const from = fr.toISOString().substring(0, 10);
        const to = new Date(dateTo.value).toISOString().substring(0, 10);
        amount.value = 33222;
        const body = {
          nr: 3300,
          name: projectName.value,
          desscription: "desc",
          company: "Edition Hotel",
          from: from,
          to: to,
          customer: firstname.value + " " + lastname.value,
          price: amount.value,
          commission: amount.value * 0.1,
        };
        api
          .post("/projects", body)
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

        /*router.push({ name: "home" });
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Project saved ",
        });*/
      },

      onSubmit() {
        if (room.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to choose payment to room",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },

      onReset() {
        name.value = null;
        age.value = null;
        accept.value = false;
      },
    };
  },
};
</script>
