<template>
    <nav>
        <v-app-bar fixed fade-on-scroll elevation="10" height="64" dark>
            <v-toolbar-title class="overline" style="font-size: 20px!important;">
                <a href="/" style="text-decoration: none; color: white;">Investment Demo</a>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <div v-show="$vuetify.breakpoint.smAndUp">
                <v-tabs background-color="#272727" slider-color="blue" slider-size="4" right height="64">
                    <v-tab to="/" class="white--text">Home</v-tab>
                </v-tabs>
            </div>
            <div v-show="$vuetify.breakpoint.xsOnly">
                <v-menu offset-y dark>
                    <template v-slot:activator="{ on }">
                        <v-app-bar-nav-icon  class="white--text" v-on="on"/>
                    </template>
                    <v-tabs vertical background-color="#272727" slider-color="blue" slider-size="4">
                        <v-tab to="/" class="white--text">Home</v-tab>
                    </v-tabs>
                </v-menu>
            </div>
        </v-app-bar>
    </nav>
</template>

<script>

</script>
