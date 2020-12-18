<template>
    <v-app>
        <Navbar/>
            <v-main style="height: 100%;" class="pt-16">
                <v-container style="margin-top: 16px;" class="pa-0">
                        <router-view></router-view>
                </v-container>
            </v-main>
        <Footer/>
    </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
    name: 'App',
    components: {
        Navbar,
        Footer,
    },
};
</script>
