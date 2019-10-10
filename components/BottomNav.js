const bottom_nav_template = /*template*/`
<div>


    <v-bottom-navigation app fixed :value="true">

        <v-btn color="teal" text small value="players" to="players">
            <span>{{ $t('players') }}</span>
            <v-icon>mdi-face</v-icon>
        </v-btn>

        <v-btn color="teal" text small value="teams" to="teams">
            <span>{{ $t('teams') }}</span>
            <v-icon>mdi-account-group</v-icon>
        </v-btn>

        <v-btn color="teal" text small value="games" to="games">
            <span>{{ $t('games') }}</span>
            <v-icon>mdi-dice-multiple</v-icon>
        </v-btn>

        <v-btn color="teal" text small value="results" to="results">
            <span>{{ $t('results') }}</span>
            <v-icon>mdi-clipboard-list</v-icon>
        </v-btn>

    </v-bottom-navigation>

</div>

`;

BottomNav = {
    name: 'bottom-nav',
    template: bottom_nav_template,
    //====================================================================================================================
    data() {
        return {

        }
    },
    //====================================================================================================================
    methods: {

    },
    //====================================================================================================================
    mounted: function() {
        console.log('[VUE] Mounted component BottomNav');
    }
}
