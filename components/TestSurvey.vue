<template>
    <div class="test-survey">
        <div>

            <transition name="fadeHeight">
                <div v-if="restrictionVisibility" class="password-restriction">
                    <h4 class="mb-1">The survey is password restricted.</h4>
                    <vs-input class="mb-2 inputx" type="password" placeholder="Password" v-model="passwordRestriction"/>
                    <vs-button @click="handlePasswordControlSubmit" color="primary" type="filled">Submit</vs-button>
                </div>
            </transition>

            <transition name="fadeHeight">
                <div v-if="(accessControlType === 'no' || accessControlPassword && permition)" class="survey">
                    <transition name="fade">
                        <div v-if="isWelcomePageVisible && !surveySubmitted">
                            <WelcomePage @handleStartSurvey="handleStartSurvey" :isDev="false"/>
                        </div>
                    </transition>
                    <transition name="fadeHeight">
                        <div v-if="isWelcomePageVisible && surveySubmitted || !isWelcomePageVisible ">
                            <vs-progress class="mb-3" v-if="statusBar === 'percent'"
                                         :percent="(questionIndex / pages.length)*100"
                                         color="primary">
                                primary
                            </vs-progress>
                            <form class="final-survey" @submit.prevent="handleSubmit">
                                <div
                                        class="widget-list d-flex fd-c item"
                                        :key="val.uuid"
                                        v-for="(val, index) in pages[pageCount].widgets"
                                >

                                    <component
                                            class="widget"
                                            :is="val.type"
                                            :val="val"
                                            :isDev="false"
                                            :widgetIdx="index"
                                            :readonly="false"
                                            ref="myChild"
                                            :data-uuid="val.uuid"
                                            @validate="handleSubmit"

                                    />

                                </div>

                                <div class="survey-controls">
                                    <vs-button v-if="isPrevPage" @click="handlePrevPage">Prev</vs-button>
                                    <vs-button v-if="isNextPage" @click="handleNextPage">Next</vs-button>

                                    <vs-button @click="handleSubmit" v-else>Complete</vs-button>
                                </div>
                            </form>
                        </div>
                    </transition>
                </div>
            </transition>
        </div>

        <div class="privacy-policy">
            <vs-popup class="holamundo" title="Privacy Policy" :active.sync="popupActive">
                <div v-html="privacyPolicyContent"></div>
            </vs-popup>

            <div v-if="isPrivacyPolicy" style="margin-top: 100px;" class="privacy-policy">
                <vs-button @click="popupActive=true" color="primary" type="border">Policy</vs-button>
            </div>
        </div>
    </div>
</template>

<script>
    import WelcomePage from "./WelcomePage";
    import {required, email} from "vuelidate/lib/validators";

    export default {
        components: {WelcomePage},
        methods: {
            handleStartSurvey(val) {
                this.$store.commit('widget/setFirstActivePage');
                this.surveySubmitted = true;
            },
            handlePasswordControlSubmit() {
                if (this.accessControlPassword === this.passwordRestriction) {
                    this.permition = true;
                    this.isAccessControlFormVisible = false;
                    return;
                }
                this.$vs.notify({title: 'Wrong Password', color: 'warning', icon: 'error'})
                this.permition = false;
            },
            handleSubmit() {


                console.log(this.$refs.myChild[0]);

                // if(this.$refs.myChild[0].$v.$invalid) {
                //     this.$refs.myChild[0].$v.$touch();
                //     return;
                // }

                alert("SUBMIT");


                // console.log(this.handleValidate());
            },
            handlePrevPage() {
                this.pageCount--;
                this.questionIndex--;
                this.$store.commit('widget/toggleActivePageUuid', 'prev');
            },
            handleNextPage() {
                this.pageCount++;
                this.questionIndex++;
                this.$store.commit('widget/toggleActivePageUuid', 'next');
            },
            handleValidate(func) {

            },
        },


        validations: {
            form: {
                name: {required},
            }
        },

        data() {
            return {
                formData: {},
                questionIndex: 0,
                pageCount: 0,
                passwordRestriction: null,
                isAccessControlFormVisible: true,
                permition: false,
                popupActive: false,
                surveySubmitted: false
            };
        },
        computed: {
            restrictionVisibility() {
                return this.accessControlType === 'password' && this.isAccessControlFormVisible;
            },
            isWelcomePageVisible: {
                get() {
                    return this.$store.getters['widget/isWelcomePageVisible'];
                },
            },
            welcomePageWidgets: {
                get() {
                    return this.$store.getters['widget/welcomePageWidgets'];
                }
            },
            isPrivacyPolicy: {
                get() {
                    return this.$store.getters['widget/isPrivacyPolicy'];
                },
            },
            privacyPolicyContent: {
                get() {
                    return this.$store.getters['widget/privacyPolicyContent'];
                }
            },
            accessControlPassword: {
                get() {
                    return this.$store.getters['widget/accessControlPassword'];
                }
            },
            accessControlType: {
                get() {
                    return this.$store.getters['widget/accessControlType'];
                },
            },
            isBackButton() {
                return this.$store.getters['widget/isBackButton'];
            },
            statusBar() {
                return this.$store.getters['widget/statusBar'];
            },
            isNextPage() {
                return this.pageCount !== this.pages.length - 1;
            },
            isPrevPage() {
                return this.pageCount > 0 && this.isBackButton === 'yes';
            },
            id() {
                return this.$store.getters['widget/uuid'];
            },
            pages: {
                get() {
                    return this.$store.getters['widget/pages'];
                }
            },
            widgetStore: {
                get() {
                    return this.$store.getters['widget/pageWidgets'];
                },
                set(value) {
                    this.$store.dispatch('widget/updatePageWidgets', value);
                }
            }
        },
        watch: {
            widgetStore(value) {
                this.formData = this.$store.getters['widget/widgetsUuid'];
                console.log(this.formData);
            }
        }
    };
</script>
