
var players_view_template = /*template*/`

<v-layout column>
  
      <AddPlayerDialog  :visible="showAddPlayerDialog" :key="showAddPlayerDialog" @close="showAddPlayerDialog=false" ></AddPlayerDialog>
      
  <v-toolbar flat dense tile>
      <v-spacer></v-spacer>
      <v-btn fab small color="indigo" @click="addSelectedToTeam"><v-icon>mdi-account-multiple-plus</v-icon></v-btn>
      &nbsp;
      <v-btn fab small color="pink" @click="showAddPlayerDialog=true"><v-icon>mdi-account-plus-outline</v-icon></v-btn>
  </v-toolbar> 


  <v-text-field
        v-model="search"
        append-icon="mdi-account-search"
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
  item-key="_id"
  show-select
  class="elevation-1">

</v-data-table>
  
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
        matchFilter = Api.removeDiacritics(item.firstname.toLowerCase()).includes(word) || 
                      Api.removeDiacritics(item.lastname.toLowerCase()).includes(word);
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
        let idList = [];

        for (let i = 0; i < this.selected.length; i++) {
          idList.push(this.selected[i]._id);
        }


        this.$store.dispatch('addTeam', idList).then((doc) => {
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
