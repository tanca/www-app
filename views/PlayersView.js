
var players_view_template = /*template*/`

<v-layout column>
  
      <AddPlayerDialog  :visible="showAddPlayerDialog" :key="showAddPlayerDialog" @close="showAddPlayerDialog=false" ></AddPlayerDialog>
      
  <v-toolbar flat dense>
      <v-spacer></v-spacer>
      <v-btn fab small color="indigo" @click="addSelectedToTeam"><v-icon>mdi-account-multiple-plus</v-icon></v-btn>
      <v-btn fab small color="pink" @click="showAddPlayerDialog=true"><v-icon>mdi-account-plus-outline</v-icon></v-btn>
  </v-toolbar> 


  <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

<v-data-table
  :headers="headers"
  :items="players"
  :search="search"
  :custom-filter="filterPlayer"
  v-model="selected"
  item-key="id"
  show-select
  hide-default-footer
  class="elevation-1">

</v-data-table>

<!--
      <v-list>
        <template v-for="(item, index) in filteredPlayers">
          
          <v-list-tile @click.capture.stop="togglePlayer(item._id)">

              <v-list-tile-action>
                <v-checkbox v-model="selected" multiple :value="item._id" />
              </v-list-tile-action>

                <v-list-tile-avatar>
                  <v-icon>account_circle</v-icon>
                </v-list-tile-avatar>
  
                <v-list-tile-content>
                <p>{{ item.firstname }} {{item.lastname }}</p>
    
                </v-list-tile-content>

          </v-list-tile>

          <v-divider></v-divider>

        </template>
      </v-list>
-->
  
</v-layout>
`;

PlayersView = {
  name: 'players-view',
  template: players_view_template,
  //====================================================================================================================
  components: {
    AddPlayerDialog
  },
  data () {
    return {
      showAddPlayerDialog: false,
      search: '',
      selected: [],
      headers: [
        { text: this.$t('number'), value: 'id' },
        { text: this.$t('firstname'), value: 'firstname' },
        { text: this.$t('lastname'), value: 'lastname' }
      ]
    }
  },
  computed: {
      players() {
        var pList = [];
        
        if (this.$store.state.docs !== null) { 
          pList = this.$store.state.docs.filter(function(doc) {
              return doc._id.includes('player:');
          });
        }
        return pList;
      }
      
  },
  //====================================================================================================================
  created() {
 
  },
  //====================================================================================================================
  beforeDestroy() {
 
  },
  //====================================================================================================================
  methods : {

    filterPlayer (value, search, item) {
      let matchFilter = true;

      if (search !== '') {
        let word = Api.removeDiacritics(search.trim().toLowerCase());
        matchFilter = item.firstname.toLowerCase().includes(word) || 
                      item.lastname.toLowerCase().includes(word);
      }

      return value != null &&
        search != null &&
        typeof value === 'string' &&
        matchFilter;
    },
    addSelectedToTeam() {
      if (this.selected.length == 0) {
        this.$eventHub.$emit('alert', 'Vous devez sélectionner au moins un joueur', 'info');
      } else {
        this.$store.dispatch('addTeam', this.selected).then((doc) => {
          this.selected = [];
          console.log('[PLAYERS] Add team: ' + JSON.stringify(doc));
          this.$eventHub.$emit('alert', "L'équipe a été créée", 'success');
        }).catch((err) => {
          this.selected = [];
          console.log('[PLAYERS] Add team failure: ' + err);
          this.$eventHub.$emit('alert', "Erreur: impossible de créer l'équipe", 'error');
        });
        
      }
    }
  },
  //====================================================================================================================
  mounted: function() {
    console.log('[VUE] Mounted component PlayersView');
  },
}
