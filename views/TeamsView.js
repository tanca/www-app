
var teams_view_template = /*template*/`

<v-layout column>

<v-toolbar flat dense tile>
    <v-spacer></v-spacer>
    
    <v-btn fab small color="indigo" @click="deleteSelectedTeams"><v-icon>mdi-account-multiple-plus</v-icon></v-btn>
    &nbsp;
    <v-btn fab small color="red" @click="deleteSelectedTeams"><v-icon>mdi-delete</v-icon></v-btn>
</v-toolbar>  

<v-data-table
    :headers="headers"
    :items="teams"
    v-model="selected"
    item-key="id"
    show-select
    class="elevation-1">

    <template v-slot:item.teamName="{ item }">
     {{ teamName(item) }}
    </template>
        
</v-data-table>

</v-layout>
`;

TeamsView = {
  name: 'teams-view',
  template: teams_view_template,
  //====================================================================================================================
  components: {
    
  },
  data () {
    return {
      selected: [],
      headers: [
        { text: this.$t('number'), value: 'id' },
        { text: this.$t('team'), value: 'teamName' }
      ]
    }
  },
  computed: {
    teams () {
      return this.$store.getters.getTeams;
    },
    teamName() {
      return this.$store.getters.getTeamName;
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
    deleteSelectedTeams() {
      if (this.selected.length == 0) {
        this.$eventHub.$emit('alert', 'Vous devez sélectionner au moins une équipe', 'info');
      } else {
        this.$store.dispatch('deleteTeam', this.selected).then((doc) => {
          this.selected = [];
          console.log('[TEAMS] Delete team: ' + JSON.stringify(doc));
          this.$eventHub.$emit('alert', "Équipe(s) supprimée(s)", 'success');
        }).catch((err) => {
          this.selected = [];
          console.log('[TEAMS] Delete team failure: ' + err);
          this.$eventHub.$emit('alert', "Erreur: impossible de supprimer l'(es) équipe(s)", 'error');
        });
      }
    }
  },
  //====================================================================================================================
  mounted: function() {
    console.log('[VUE] Mounted component TeamsView');
  },
}
