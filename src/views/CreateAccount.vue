<template>
    <div>
        <v-snackbar v-model="snackbarQualified" :timeout="3000" top color="blue" class="mt-0 pt-0">
            <v-row class="pa-0 ma-0">
                <span class="black--text body-2 font-weight-medium pt-2">You have been qualified for this investment!</span>
                <v-spacer></v-spacer>
                <v-btn text class="black--text ml-16" @click="snackbarQualified = false" icon ><v-icon>mdi-close</v-icon></v-btn>
            </v-row>
        </v-snackbar>
        <v-snackbar v-model="snackbarCreateAccountComplete" :timeout="3000" top color="blue" class="mt-0 pt-0">
            <v-row class="pa-0 ma-0">
                <span class="black--text body-2 font-weight-medium pt-2">Account Created!</span>
                <v-spacer></v-spacer>
                <v-btn text class="black--text ml-16" @click="snackbarCreateAccountComplete = false" icon ><v-icon>mdi-close</v-icon></v-btn>
            </v-row>
        </v-snackbar>
        <v-row class="ma-0 pa-0 pt-10 px-6" justify="center" v-if="isAccountCreationComplete">
            <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="10" class="ma-0 pa-0">
                <v-row class="pt-14" justify="center">
                    <p class="display-2 text-center">Thank you for choosing us!</p>
                </v-row>
            </v-col>
        </v-row>
        <v-row class="ma-0 pa-0 pt-10 px-6" justify="center" v-if="!isAccountCreationComplete">
            <v-col cols="12" xs="12" sm="12" md="10" lg="8" xl="6" class="ma-0 pa-0">
                <v-row justify="center" class="pt-2 pb-11">
                    <v-btn x-large icon color="black" md-back @click="backToHome()">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <p class="display-1" style="position: absolute;">Create Account</p>
                    <v-spacer></v-spacer>
                </v-row>
                 <v-card style="border-top: 8px solid #272727 !important;" class="pa-8 pb-0" elevation="8">
                    <v-row justify="center">
                         <p class="headline">Account Information</p>
                    </v-row>
                    <v-divider class="mx-5 mb-8"></v-divider>
                    <v-row justify="center">
                        <v-text-field
                            v-model=username
                            label="Username"
                            color="blue"
                            outlined
                            ref="usernameRef"
                            required
                            :rules="usernameRules"
                            autofocus
                            validate-on-blur
                        ></v-text-field>
                    </v-row>
                    <v-row justify="center">
                        <v-text-field
                            v-model=password
                            label="Password"
                            color="blue"
                            outlined
                            ref="passwordRef"
                            required
                            :rules="passwordRules"
                            counter="9"
                        ></v-text-field>
                    </v-row>
                     <v-row justify="center">
                        <v-text-field
                            v-model=confirmPassword
                            label="Confirm Password"
                            color="blue"
                            outlined
                            ref="confirmPasswordRef"
                            required
                            :rules="confirmPasswordRules"
                            counter="9"
                        ></v-text-field>
                    </v-row>
                    <v-row justify="center" class="pb-6">
                        <v-btn class="black white--text" large :disabled="!isAccountInfoComplete" @click="createAccount()">Create</v-btn>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { isValidEmail, isValidPassword } from '@/sdk/input';

export default {
    data() {
        return {    
            snackbarQualified: false,
            snackbarCreateAccountComplete: false,
            isAccountCreationComplete: false,
            username: null,
            password: null,
            confirmPassword: null,
            usernameRules: [
                (v) => isValidEmail(v) || 'Enter your email address',
            ],
            passwordRules: [
                (v) => isValidPassword(v) || 'Password must contain more than 8 characters, at least one being a number or special character',
            ],
            confirmPasswordRules: [
                (v) => isValidPassword(v) || 'Password must contain more than 8 characters, at least one being a number or special character',
                (v) => v && this.password === this.confirmPassword || 'Passwords must match',
            ],
        };
    },
    computed: {
        isAccountInfoComplete() {
            return this.username
            && this.password
            && this.confirmPassword
            && this.$refs.usernameRef.validate()
            && this.$refs.passwordRef.validate()
            && this.$refs.confirmPasswordRef.validate()
            && this.password === this.confirmPassword;
        },
    },
    methods: {
        backToHome() {
            this.$router.push('/');
        },
        createAccount() {
            this.snackbarCreateAccountComplete = true;
            this.isAccountCreationComplete = true;
        },
    },
    created() {
        this.snackbarQualified = true;
    },
}
</script>
