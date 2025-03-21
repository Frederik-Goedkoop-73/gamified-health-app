<script setup>
import { House } from 'lucide-vue-next'

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <section>
    <div class="terms-container rounded-lg bg-white p-8 shadow-md">
      <Button class="mb-5 min-w-10" :disabled="isLoading">
        <NuxtLink to="/" class="flex flex-row items-center gap-4" @click="setOpenMobile(false)">
          <House class="h-5 w-5" />
          <span>Back to dashboard</span>
        </NuxtLink>
      </Button>
      <h1 class="mb-4 text-3xl font-bold">
        Terms of Service
      </h1>
      <p class="mb-6">
        <strong>Last Updated: </strong> March 3rd 2025
      </p>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          1. Acceptance of Terms
        </h2>
        <p>
          By using the KUL Health Monitor (the "Website"), you agree to comply with and be legally bound by these Terms. These Terms
          govern your access to and use of the Website, including any content, functionality, and services offered on
          or through the Website.
        </p>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          2. Description of Service
        </h2>
        <p>
          The Website provides a platform for participants to engage in a fitness study. The study involves
          the use of a Fitbit tracker to monitor fitness activities and a gamified website to track progress,
          complete surveys, and earn experience points (XP). The Website is designed to help participants achieve their
          fitness goals through motivation, engagement, and feedback.
        </p>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          3. Eligibility
        </h2>
        <p>
          To use the Website, you must be at least 18 years old and capable of forming a binding contract. By
          using the Website, you represent and warrant that you meet these eligibility requirements.
        </p>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          4. User Responsibilities
        </h2>
        <p>
          By participating in the study and using the Website, you agree to:
        </p>
        <ul class="ml-4 list-disc list-inside">
          <li>
            Provide accurate and complete information in all surveys, including the initial survey, weekly
            check-ins, and final survey.
          </li>
          <li>Use the Fitbit tracker and Website in accordance with the instructions provided.</li>
          <li>Notify us of any issues or discomfort experienced while using the Fitbit tracker or Website.</li>
          <li>Comply with all applicable laws and regulations.</li>
        </ul>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          5. Privacy Policy
        </h2>
        <p>
          Your use of the Website is also governed by our Privacy Policy, which explains how we collect, use,
          and protect your personal information. By using the Website, you consent to the collection and use of
          your information as outlined in the Privacy Policy.
        </p>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          6. Fitbit API Integration
        </h2>
        <p>
          The Website integrates with the Fitbit API to collect and display fitness data from your Fitbit
          tracker. By using the Website, you authorize us to access and use your Fitbit data in accordance with these
          Terms, our Privacy Policy, and Fitbit's Platform Terms of Service.
        </p>

        <h3 class="mt-4 text-xl font-semibold">
          6.1. Fitbit Account
        </h3>
        <p>
          To use the Fitbit API integration, you must have a valid Fitbit account and authorize the Website to
          access your Fitbit data. You are responsible for maintaining the confidentiality of your Fitbit account
          credentials and for all activities that occur under your account.
        </p>

        <h3 class="mt-4 text-xl font-semibold">
          6.2. Data Usage
        </h3>
        <p>
          We will use your Fitbit data solely for the purposes of the study, including tracking your fitness
          activities, providing feedback, and generating reports. We will not share your Fitbit data with
          third parties without your consent, except as required by law or as necessary to provide the services
          outlined in these Terms.
        </p>

        <h4 class="mt-2 text-lg font-semibold">
          6.2.1. Compliance with Fitbit's Terms
        </h4>
        <ul class="ml-4 list-disc list-inside">
          <li>
            We will only access Fitbit user data with explicit user consent, and we will not use the Fitbit
            API to access data beyond the scope of the permissions granted by the user.
          </li>
          <li>
            We will not use Fitbit data for any unlawful purpose or in violation of Fitbit's Platform Terms
            of Service.
          </li>
          <li>We will not sell, rent, or lease Fitbit user data to third parties.</li>
          <li>We will not use Fitbit data for advertising or marketing purposes without explicit user consent.</li>
        </ul>

        <h3 class="mt-4 text-xl font-semibold">
          6.3. Data Security
        </h3>
        <p>
          We will implement and maintain appropriate technical and organizational measures to protect Fitbit
          user data from unauthorized access, disclosure, or misuse. In the event of a data breach involving Fitbit
          user data, we will notify Fitbit and affected users promptly and take appropriate steps to mitigate
          the breach.
        </p>

        <h3 class="mt-4 text-xl font-semibold">
          6.4. Data Retention
        </h3>
        <p>
          We will retain Fitbit user data only for as long as necessary to fulfill the purposes outlined in
          these Terms or as required by law. Upon request, we will delete or anonymize Fitbit user data in
          accordance with Fitbit's Platform Terms of Service.
        </p>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          7. Intellectual Property
        </h2>
        <p>
          All content on the Website, including text, graphics, logos, and software, is the property of the
          University of Leuven (KUL) or its licensors and is protected by intellectual property laws. You may
          not reproduce, distribute, or create derivative works from any content on the Website without our prior written
          consent.
        </p>

        <h3 class="mt-4 text-xl font-semibold">
          7.1. Fitbit Intellectual Property
        </h3>
        <p>
          The Fitbit API, Fitbit trademarks, and any related content are the intellectual property of Fitbit,
          Inc. You may not use Fitbit's intellectual property without Fitbit's prior written consent. You agree not
          to reverse engineer, decompile, or disassemble the Fitbit API or any Fitbit software.
        </p>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          8. Limitation of Liability
        </h2>
        <p>
          To the fullest extent permitted by law, the University of Leuven (KUL) shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
          incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses,
          resulting from:
        </p>
        <ul class="ml-4 list-disc list-inside">
          <li>Your use or inability to use the Website.</li>
          <li>Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
          <li>Any interruption or cessation of transmission to or from the Website.</li>
          <li>Any bugs, viruses, or other harmful code that may be transmitted to or through the Website.</li>
        </ul>

        <h3 class="mt-4 text-xl font-semibold">
          8.1. Fitbit's Limitation of Liability
        </h3>
        <p>
          Fitbit is not responsible for any issues arising from your use of the Fitbit API or Fitbit data on
          the Website. Any disputes related to Fitbit data or the Fitbit API must be resolved directly with
          Fitbit.
        </p>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          9. Termination
        </h2>
        <p>
          We reserve the right to terminate or suspend your access to the Website at any time, without notice,
          for any reason, including but not limited to a breach of these Terms.
        </p>

        <h3 class="mt-4 text-xl font-semibold">
          9.1. Fitbit API Access
        </h3>
        <p>
          Fitbit reserves the right to suspend or terminate your access to the Fitbit API at any time, with or
          without cause. If Fitbit terminates your access to the API, we will no longer be able to provide
          services that rely on Fitbit data.
        </p>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          10. Changes to Terms
        </h2>
        <p>
          We may update these Terms from time to time. If we make material changes, we will notify you by
          posting the updated Terms on the Website. Your continued use of the Website after the changes become
          effective constitutes your acceptance of the revised Terms.
        </p>

        <h3 class="mt-4 text-xl font-semibold">
          10.1. Fitbit's Right to Modify
        </h3>
        <p>
          Fitbit may modify its Platform Terms of Service at any time. You are responsible for regularly
          reviewing Fitbit's terms to ensure compliance.
        </p>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          11. Governing Law
        </h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of Belgium,
          without regard to its conflict of law principles.
        </p>

        <h3 class="mt-4 text-xl font-semibold">
          11.1. Fitbit's Governing Law
        </h3>
        <p>
          Any disputes related to the Fitbit API or Fitbit data will be governed by Fitbit's Platform Terms of
          Service, which are governed by the laws of the State of California, USA.
        </p>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          12. Contact Information
        </h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <p>
          University of Leuven<br>
          <a href="https://www.kuleuven.be/wieiswie/nl/unit/regional/53386927" class="hover:underline">Biosystemen - Afdeling Dier en Mens, Kasteelpark Arenberg 30, 3001 Leuven</a><br>
          <a href="mailto:Frederik.Goedkoop@student.uantwerpen.be" class="text-blue-500 hover:underline">Frederik.Goedkoop@student.uantwerpen.be</a><br>
          <a href="tel:+32474547625" class="text-blue-500 hover:underline">+32 4 74 54 76 25</a>
        </p>
      </section>
    </div>
  </section>
</template>
