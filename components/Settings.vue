<template>
    <div class="settings">

        <div class="settings-row">
            <div class="setting-label">
                <h6 class="fw-b">Back Button:</h6>
            </div>

            <div class="setting-opt">
                <vs-radio class="mb-2" v-model="isBackButton" vs-name="isBackButton" vs-value="yes">Show: The
                    participant can go back
                    during
                    the survey and, if necessary, correct his answers.
                </vs-radio>
                <vs-radio v-model="isBackButton" vs-name="isBackButton" vs-value="no">Hide: The participant can't go
                    back in the
                    survey. Recommended setting for working with filters / jumps.
                </vs-radio>
            </div>
        </div>
        <vs-divider/>
        <div class="settings-row">
            <div class="setting-label">
                <h6 class="fw-b">Status Bar:</h6>
            </div>

            <div class="setting-opt">
                <vs-radio class="mb-2" v-model="statusBar" vs-name="statusBar" vs-value="percent">Percent
                </vs-radio>
                <vs-radio v-model="statusBar" vs-name="statusBar" vs-value="no">No
                </vs-radio>
            </div>
        </div>
        <vs-divider/>
        <div class="settings-row">
            <div class="setting-label">
                <h6 class="fw-b">Access Control:</h6>
            </div>

            <div class="setting-opt setting-opt-access d-flex ai-c">
                <div class="setting-item">
                    <vs-radio class="mb-2" v-model="accessControlType" vs-name="accessControlType" vs-value="no">No
                    </vs-radio>
                    <vs-radio v-model="accessControlType" vs-name="accessControlType" vs-value="password">
                        Password
                    </vs-radio>
                </div>


                <transition name="fade">
                    <vs-input v-if="accessControlType === 'password'" type="password" label="Password"
                              placeholder="Type password"
                              v-model="accessControlPassword"/>
                </transition>

            </div>
        </div>
        <vs-divider/>
        <div class="settings-row mb-3">
            <div class="setting-label">
                <h6 class="fw-b">Privacy Policy:</h6>
            </div>

            <div class="setting-opt">
                <vs-checkbox v-model="isPrivacyPolicy">Privacy Policy</vs-checkbox>
            </div>
        </div>
        <div>
            <transition name="fadeHeight">
                <div v-if="isPrivacyPolicy">
                    <div class="quill-editor"
                         :content="privacyPolicyContent"
                         @change="onEditorChange($event)"
                         @blur="onEditorBlur($event)"
                         @focus="onEditorFocus($event)"
                         @ready="onEditorReady($event)"
                         v-quill:myQuillEditor="editorOption">
                    </div>
                </div>
            </transition>

        </div>
        <vs-divider/>
        <div class="settings-row">
            <div class="setting-label">
                <h6 class="fw-b">Welcome Page:</h6>
            </div>

            <div class="setting-opt">
                <vs-checkbox v-model="isWelcomePageVisible">Welcome Page Visibility</vs-checkbox>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Settings",
        data() {
            return {
                editorContent: null,
                editorOption: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{'header': 1}, {'header': 2}],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            [{'script': 'sub'}, {'script': 'super'}],
                            [{'indent': '-1'}, {'indent': '+1'}],
                            [{'direction': 'rtl'}],
                            [{'size': ['small', false, 'large', 'huge']}],
                            [{'header': [1, 2, 3, 4, 5, 6, false]}],
                            [{'font': []}],
                            [{'color': []}, {'background': []}],
                            [{'align': []}],
                            ['clean'],
                            ['link', 'image', 'video']
                        ],
                        syntax: {
                            highlight: text => hljs.highlightAuto(text).value
                        }
                    }
                },
            }
        },
        methods: {
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },
            onEditorChange({editor, html, text}) {
                this.$store.commit('widget/updatePrivacyPolicyContent', html)
                // this.val.content = html
            }
        },
        computed: {
            isWelcomePageVisible: {
                get() {
                    return this.$store.getters['widget/isWelcomePageVisible'];
                },
                set(value) {
                    this.$store.commit('widget/updateWelcomePageVisibility', value);
                }
            },
            privacyPolicyContent: {
                get() {
                    return this.$store.getters['widget/privacyPolicyContent'];
                },
                // set(content) {
                //   this.$store.commit('widget/updatePrivacyPolicyContent', content)
                // },
            },
            isPrivacyPolicy: {
                get() {
                    return this.$store.getters['widget/isPrivacyPolicy'];
                },
                set(value) {
                    this.$store.commit('widget/isPrivacyPolicy')
                }
            },
            accessControlPassword: {
                get() {
                    return this.$store.getters['widget/accessControlPassword'];
                },
                set(value) {
                    this.$store.commit('widget/accessControlPassword', value)
                }
            },
            accessControlType: {
                get() {
                    return this.$store.getters['widget/accessControlType'];
                },
                set(value) {
                    this.$store.commit('widget/accessControlType', value)
                }
            },
            statusBar: {
                get() {
                    return this.$store.getters['widget/statusBar'];
                },
                set(value) {
                    this.$store.commit('widget/statusBar', value)
                }
            },
            isBackButton: {
                get() {
                    return this.$store.getters['widget/isBackButton'];
                },
                set(value) {
                    this.$store.commit('widget/isBackButton', value)
                }
            }
        }
    }
</script>

<style scoped>

</style>
