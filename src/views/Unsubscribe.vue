<template>
  <div class="unsubscribe-card__wrapper">
    <v-container class="mb-12">
      <div class="unsubscribe-card">
        <h2 class="unsubscribe-card__title">
          You have {{ subscribeSuccess ? 're-subscribed' : 'unsubscribed' }}
        </h2>

        <v-card class="mb-6">
          <p>
            Email Address: <strong>{{ user.email }}</strong>
          </p>

          <p v-if="subscribeSuccess" class="mb-0 mt-5">
            You have re-subscribed to
            <strong>Travel</strong>'s hotel recommendations emails
            <span v-if="getDestinationUnsubscribe">
              for
              <strong>{{ getDestinationUnsubscribe }}</strong>
            </span>
          </p>

          <div v-else>
            <p>
              You have unsubscribed from
              <strong>Travel</strong>'s hotel recommendations emails
              <span v-if="getDestinationUnsubscribe">
                for
                <strong>{{ getDestinationUnsubscribe }}</strong>
              </span>
            </p>
            <p>
              You will not receive any more recommendations for this trip
            </p>
            <p>
              Don't want to unsubscribe? Click below
            </p>
            <v-btn color="primary" depressed rounded @click="subscribe">
              Re-subscribe
            </v-btn>
          </div>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';

export default {
  name: 'Unsubscribe',
  data: () => ({
    subscribeSuccess: null
  }),
  computed: {
    ...mapGetters('user', ['user', 'getDestinationUnsubscribe'])
  },
  methods: {
    ...mapActions('user', ['unsubscribe', 'resubscribe']),
    subscribe() {
      this.resubscribe().then(response => {
        if (response) {
          this.subscribeSuccess = true;
          logAmplitudeEvent(amplitudeEvents.subscribe.userClicksResubscribe, {
            travellerEmail: this.user.email
          });
        }
      });
    }
  },
  created() {
    this.unsubscribe();
    logAmplitudeEvent(amplitudeEvents.subscribe.userUnsubscribed, {
      travellerEmail: this.user.email
    });
  }
};
</script>
<style lang="scss">
@import 'src/scss/utils/__utils';
.unsubscribe-card {
  width: 500px;
  max-width: 100%;
  margin: auto;
  &__wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__title {
    font-size: 32px;
    line-height: 33px;
    font-weight: 600;
    margin: 0 0 40px;
    text-align: center;
  }
  @include query-767 {
    &__title {
      font-size: 24px;
      line-height: 32px;
      margin: 32px 0 32px;
      text-align: center;
    }
  }
}
</style>
