<template>
    <div>
        <v-row class="ma-0 pa-0 pt-10 px-6" justify="center">
            <v-col cols="12" xs="12" sm="12" md="10" lg="8" xl="6" class="ma-0 pa-0">
                <v-row justify="center" class="pt-2 pb-10">
                        <p class="display-1">Tell us about yourself</p>
                </v-row>
                <v-card style="border-top: 8px solid #272727 !important;" class="pa-8 pb-0" elevation="8">
                    <v-row justify="center">
                         <p class="headline">Financial Information</p>
                    </v-row>
                    <v-divider class="mx-5 mb-8"></v-divider>
                    <v-row justify="center">
                        <v-text-field
                            v-model=investmentAmount
                            label="Investment Amount"
                            color="blue"
                            outlined
                            ref="investmentAmountRef"
                            required
                            :rules="investmentAmountRules"
                            prefix="$"
                            validate-on-blur
                            autofocus
                        ></v-text-field>
                    </v-row>
                    <v-row justify="center" class="pb-8">
                        <v-text-field
                            v-model=investmentType
                            label="Investment Type"
                            color="blue"
                            outlined
                            ref="investmentTypeRef"
                            required
                            :rules="investmentTypeRules"
                            validate-on-blur
                        ></v-text-field>
                    </v-row>
                    <v-row justify="center">
                        <v-text-field
                            v-model=netWorth
                            label="Total Net Worth"
                            color="blue"
                            outlined
                            ref="netWorthRef"
                            required
                            :rules="netWorthRules"
                            prefix="$"
                            validate-on-blur
                        ></v-text-field>
                    </v-row>
                     <v-row justify="center">
                        <v-text-field
                            v-model=yearlyIncome
                            label="Yearly Income"
                            color="blue"
                            outlined
                            ref="yearlyIncomeRef"
                            required
                            :rules="yearlyIncomeRules"
                            prefix="$"
                            validate-on-blur
                        ></v-text-field>
                     </v-row>
                    <v-row justify="center">
                        <v-text-field
                            v-model=creditScore
                            label="Credit Score (300-850)"
                            color="blue"
                            outlined
                            ref="creditScoreRef"
                            required
                            :rules="creditScoreRules"
                        ></v-text-field>
                    </v-row>
                    <v-row justify="center" class="pb-6">
                        <v-btn class="black white--text" large @click="submitFinancialInfo()" :disabled="!isFinancialInfoComplete">Submit</v-btn>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { compact } from '@/sdk/input';
import { Client } from '@/client';

const client = new Client();

export default {
    data() {
        return {    
            investmentAmount: null,
            investmentType: null,
            netWorth: null,
            yearlyIncome: null,
            creditScore: null,
            disqualifiedMessage: null,
            isQualified: false,
            status: null,
            investmentAmountRules: [
                (v) => (v && compact(v).length > 0) || 'Enter Investment Amount',
            ],
            investmentTypeRules: [
                (v) => (v && compact(v).length > 0) || 'Enter Investment Type',
            ],
            netWorthRules: [
                (v) => (v && compact(v).length > 0) || 'Enter Net Worth',
            ],
            yearlyIncomeRules: [
                (v) => (v && compact(v).length > 0) || 'Enter Yearly Income',
            ],
            creditScoreRules: [
                (v) => (v && compact(v) >= 300 && compact(v) <= 850) || 'Enter a valid credit score (300-850)',
            ],
        };
    },
    computed: {
        isFinancialInfoComplete() {
            return this.investmentAmount
            && this.investmentType
            && this.netWorth
            && this.yearlyIncome
            && this.creditScore
            && this.$refs.investmentAmountRef.validate()
            && this.$refs.investmentTypeRef.validate()
            && this.$refs.netWorthRef.validate()
            && this.$refs.yearlyIncomeRef.validate()
            && this.$refs.creditScoreRef.validate();
        },
    },
    methods: {
        async submitFinancialInfo() {
            // Start loading bar while performing network task
            this.$store.commit('loading', { submitFinancialInfo: true });

            // Sample network call to client.investment.qualify, then store result from promise and continue with decision tree
            const financialInfo = { investmentAmount: this.investmentAmount, investmentType: this.investmentType, netWorth: this.netWorth, yearlyIncome: this.yearlyIncome, creditScore: this.creditScore };
            console.log(`financialInfo: ${JSON.stringify(financialInfo)}`);
            const { isQualified } = await client.investment.qualify({ financialInfo });
            this.isQualified = isQualified;

            // NOTE: Qualification service will do this check, and return answer in promised 'isQualified' value
            var testResponse = { data: { disqualifiedMessage: null, isQualified: false } };
            if (financialInfo.investmentAmount > financialInfo.yearlyIncome * 0.2) {
                testResponse.data.isQualified = false;
                testResponse.data.disqualifiedMessage = 'Yearly income not sufficient';
            } else if (financialInfo.creditScore < 600) {
                testResponse.data.isQualified = false;
                testResponse.data.disqualifiedMessage = 'Credit score not sufficient';
            } else if (financialInfo.investmentAmount > financialInfo.netWorth * 0.03) {
                testResponse.data.isQualified = false;
                testResponse.data.disqualifiedMessage = 'Net worth not sufficient';
            } else if (financialInfo.investmentAmount > 9000000) {
                testResponse.status = 400; // BAD_REQUEST
                testResponse.data.disqualifiedMessage = 'Investment maximum exceeded'
            } else {
                testResponse.data.isQualified = true;
            }
            this.status = testResponse.status;
            this.isQualified = testResponse.data.isQualified;
            this.disqualifiedMessage = testResponse.data.disqualifiedMessage;
            console.log(`isQualified: ${this.isQualified}, status: ${this.status}, disqualifiedMessage: ${this.disqualifiedMessage}`);

            // If !isQualified or status is bad request, send user to /disqualification with message query. Else, send user to /create-account
            // NOTE: Timeout is to simulate waiting on network call
            setTimeout(() => {
                if (!this.isQualified || this.status === 400) {
                    this.$router.push({ path: '/disqualification', query: { disqualifiedMessage: this.disqualifiedMessage } });
                } else {
                    this.$router.push('/create-account');
                }
                this.$store.commit('loading', { submitFinancialInfo: false });
            }, 2000);
        },
    }
}
</script>
