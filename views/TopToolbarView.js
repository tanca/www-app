const top_toolbar_view_template = /*template*/`
<div>

<!-- The key is necessary to re-render the component in case of session has changed -->
<SessionDialog  :visible="showSessionDialog" :key="showSessionDialog" @close="showSessionDialog=false" ></SessionDialog>
     
<v-navigation-drawer
  v-model="drawer"
   absolute
   temporary
  >
    <v-list-item>
      <v-list-item-avatar>
        <v-icon>mdi-account-circle</v-icon>
        <!--<v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>-->
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Your account</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>

      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        @click="showSession()"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
</v-navigation-drawer>

<v-app-bar fixed app>

    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    
    <v-spacer></v-spacer>

    
    <v-btn to="/home" icon>
        <v-icon>mdi-home</v-icon>
    </v-btn>
    <!--
    <v-btn icon>
        <v-icon>refresh</v-icon>
    </v-btn>
    <v-btn icon>
        <v-icon>backup</v-icon>
    </v-btn>
    -->
</v-app-bar>

</div>

`;


TopToolbarView = {
    name: 'top-toolbar-view',
    template: top_toolbar_view_template,
      //====================================================================================================================
    components: {
        SessionDialog
    },
    //====================================================================================================================
    data() {
        return {
            title: "Tanca",
            showSessionDialog: false,
            drawer: null,
            items: [
                { title: 'Sessions', icon: 'mdi-database' },
                { title: 'Options', icon: 'mdi-settings-outline' },
            ],
        }
    },
    //====================================================================================================================
    methods: {
        
        showSession: function()  {
            this.showSessionDialog = true;
        }
    },
    //====================================================================================================================
    mounted: function() {
        console.log('[VUE] Mounted component TopToolbar');
    }
}
