<template>
  <div>
    <editable-input
      :value="user.firstName"
      label="First name"
      @submit="setNewFirstName"
    ></editable-input>
    <editable-input
      :value="user.lastName"
      label="Last name"
      @submit="setNewLastName"
    ></editable-input>
    <editable-input
      :value="user.email"
      label="Email address"
      @submit="setNewEmail"
    ></editable-input>
    <editable-input
      label="Password"
      password
      @submit="setNewPassword"
    ></editable-input>
    <editable-input
      :value="user.phone"
      label="Phone number"
      @submit="setNewPhone"
    ></editable-input>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EditableInput from '@/components/filters/EditableInput';
export default {
  name: 'Security',
  components: {
    EditableInput
  },
  data() {
    return {
      form: {}
    };
  },
  computed: {
    ...mapGetters('user', ['user'])
  },
  methods: {
    ...mapActions('user', {
      setNewFirstName: 'setNewFirstName',
      setNewLastName: 'setNewLastName',
      setNewEmail: 'setNewEmail',
      setNewPassword: 'setNewPassword',
      setNewPhone: 'setNewPhone'
    })
  }
};
</script>
