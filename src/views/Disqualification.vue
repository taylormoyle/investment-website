<template>
    <div>
        <v-row class="ma-0 pa-0 pt-10 px-6" justify="center">
            <v-col cols="12" xs="12" sm="12" md="10" lg="8" xl="6" class="ma-0 pa-0">
                <v-row justify="center" class="pt-2 pb-10">
                    <p class="display-1">You have been disqualified</p>
                </v-row>
                 <v-card style="border-top: 8px solid red !important;" class="pa-8 pb-0" elevation="8">
                    <v-row justify="center">
                         <p class="headline">Disqualification Information</p>
                    </v-row>
                    <v-divider class="mx-5 mb-8"></v-divider>
                    <p class="body-1 text-center">Your request has been denied<strong class="red--text" v-if="disqualifiedMessage">: {{ disqualifiedMessage }}</strong>.</p>
                    <p class="body-1 text-center">Call our support hotline at <strong>1-800-123-4567</strong> or visit our Help Center with further inquiries.</p>
                    <v-row justify="center" class="pt-4 pb-6">
                        <v-btn class="black white--text" large fab href="https://support.github.com/"><v-icon>mdi-help</v-icon></v-btn>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {    
            disqualifiedMessage: null,
        };
    },
    created() {
        console.log(`disqualifiedMessage: ${this.$route.query.disqualifiedMessage}`)
        if (this.$route.query.disqualifiedMessage) {
            this.disqualifiedMessage = this.$route.query.disqualifiedMessage;
        }
    },
};
</script>
