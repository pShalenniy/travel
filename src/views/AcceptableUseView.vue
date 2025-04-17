<template>
  <div class="container content-page">
    <h1>ACCEPTABLE USE POLICY</h1>

    <h3>INTRODUCTION</h3>
    <p>
      Thank you for visiting our website {{ getUrl }} (our
      <strong>site</strong>). This is our Acceptable Use Policy and by using our
      site, this policy applies to you and you agree with it as part of our
      <router-link :to="{ name: 'terms' }">
        <strong>Website Terms and Conditions</strong> </router-link
      >.
    </p>
    <p>
      The terms in our Acceptable Use Policy may change, so we advise you to
      check this page because when you use our site, you are bound by it.
    </p>
    <h3>ABOUT US</h3>
    <p>
      This site is run and maintained by Your Travel Ltd
      (“<strong>we</strong>”), whose email address is info@travel.
    </p>
    <h3>USE OF OUR SITE</h3>
    <p>
      You agree not to use this site for any of the following purposes:
    </p>
    <ul>
      <li>
        to break any laws or regulations;
      </li>
      <li>
        to do anything fraudulent, or which has a fraudulent effect;
      </li>
      <li>
        to harm or attempt to harm minors;
      </li>
      <li>
        to do anything with material that does not meet our content standards
        (these are listed below);
      </li>
      <li>
        to copy in any way or re-sell any part of our site;
      </li>
      <li>
        to interfere with or damage any part of our site, equipment, network,
        software or storage arrangements;
      </li>
      <li>
        for unsolicited advertising material (known as spam); and
      </li>
      <li>
        to transmit any data or material that is harmful to other programs,
        software, or hardware.
      </li>
    </ul>
    <h3></h3>
    <p>
      Our content standards apply to all material that you contribute either to
      our site or to our interactive services.
    </p>
    <p>
      Your contributions must be accurate (if they are factual), genuine (if
      they state opinions) and within the law.
    </p>
    <p>
      Your contributions must not be defamatory, obscene or offensive, likely to
      deceive, harass, annoy, threaten, or invade someone else's privacy. Your
      contributions must not promote material that is sexually explicit, promote
      violence or discrimination based on race, sex, religion, nationality, age,
      disability, or sexual orientation, infringe anyone else's intellectual
      property, be used to impersonate anyone, or misrepresent anyone's identity
      or encourage or assist anything that breaks the law.
    </p>
    <h3>INTERACTIVE SERVICES</h3>
    <p>
      Where we provide use of interactive services, we will tell you clearly
      about the service, we will tell you what form of moderation we use for the
      site, we will try to assess risks on the site and will moderate if we
      think it is appropriate.
    </p>
    <p>
      We are not however required to moderate our interactive service and we
      will not be responsible for any loss or damage to anyone who does not use
      our site according to our standards (whether or not we have moderated the
      service).
    </p>
    <h3>AGE LIMIT</h3>
    <p>
      Our services are not intended for the use of minors under the age of 13.
    </p>
    <h3>SUSPENSION AND TERMINATION</h3>
    <p>
      If we believe you are in breach of our Acceptable Use Policy, we will take
      whatever steps we think are necessary to address this, including stopping
      your use of the site temporarily or permanently, removing material you
      have put on the site or any of our social media groups, sending you a
      formal warning, taking legal action and / or telling the relevant
      authorities.
    </p>
    <p>
      We will not be held liable for any of your costs arising from any actions
      we take to deal with any breach of this policy.
    </p>
  </div>
</template>

<script>
import { amplitudeEvents, logAmplitudeEvent } from '@/utils/amplitude';

export default {
  name: 'AcceptableUseView',
  created() {
    logAmplitudeEvent(amplitudeEvents.staticPages.viewAcceptable);
  },
  computed: {
    getUrl() {
      return window.location.origin;
    }
  }
};
</script>
