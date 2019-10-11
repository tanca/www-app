var session_dialog_template = /*template*/`
<v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
<v-card>
  <v-row no-gutters>
    <v-col cols="12">

      <!-- TOOLBAR -->
      <v-toolbar dense>
        <v-btn icon @click.stop="show=false">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
        <v-toolbar-title>Sessions</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn color="success" @click="newSession()">{{ $t('new_session') }}</v-btn>
        </v-toolbar-items>
        
      </v-toolbar>

        <!-- CENTRE DU DIALOG -->
        <v-data-table :headers="headers"
                :items="sessions"
                class="elevation-1">

          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.date" :style="getRowStyle(item.isCurrent)">
                <td>{{ item.date }}</td>
                <td><v-icon small @click="loadSession(item)">mdi-download</v-icon></td>
                <td><v-icon small @click="deleteSession(item)">mdi-delete</v-icon></td>
              </tr>
            </tbody>
          </template>



        </v-data-table>
    </v-col>
  </v-row>
</v-card>
</v-dialog>
`;
// <tr :style="getRowStyle(props.item.isCurrent)">
SessionDialog = {
  template: session_dialog_template,
  props: {
    visible: {
        type: Boolean,
        default: false
    },
  },
  data() {
      return {
        errorMessages: '',
        headers: [
          { text: this.$t('session_date'), value: 'date' },
          { text: this.$t('load'), value: 'load' },
          { text: this.$t('delete'), value: 'delete' },
        ]
      }
  },
  computed: {
    currentSession() {
      return this.$store.state.sessionId;
    }, 
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {

          if (this.currentSession == '') {
            this.$eventHub.$emit('alert', "Sélectionnez ou créez une session.", 'error');
          } else {
            this.$router.push('teams');
            this.$emit('close');
          }
        }
      }
    },
    sessions () {
        let items = [];
        let sList = this.$store.getters.getSessions;
        sList.forEach(s => {

            let iso = s.id.replace('session:', '');
            let entry = {
                date_iso: iso,
                date: moment(iso).format("MMMM Do YYYY, H:mm"),
                isCurrent: s.isCurrent
            }
            items.push(entry);
        });

        return items;
    }
  },
  methods: {
    getRowStyle(isCurrent) {
      return { backgroundColor: isCurrent ? 'steelblue' : 'transparent' }
    },
    newSession () {
      this.$store.dispatch('createSession').then( () => {
        this.$eventHub.$emit('alert', "Nouvelle session créée", 'success');
      }).catch( (err) => {
        this.$eventHub.$emit('alert', "Impossible de créer la session: " + err, 'error');
      });
    },
    deleteSession(item) {
      if (this.$store.getters.sessionExists(item.date_iso)) {
        this.$store.dispatch('deleteSession', 'session:' + item.date_iso).then( () => {
          this.$eventHub.$emit('alert', "Session supprimée", 'success');
        }).catch((err) => {
          this.$eventHub.$emit('alert', "Impossible de supprimer la session: " + err, 'error');
        });
      }
    },
    loadSession(item) {
      if (this.$store.getters.sessionExists(item.date_iso)) {
        this.$store.dispatch('loadSession', 'session:' + item.date_iso).then( () => {
          this.$eventHub.$emit('alert', "Session chargée", 'success');
        }).catch((err) => {
          this.$eventHub.$emit('alert', "Impossible de charger la session: " + err, 'error');
        });
      }
    }
  }
}


