<script setup>
import { House } from 'lucide-vue-next'

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <section>
    <Card class="privacy-container rounded-lg p-8">
      <Button class="mb-5 min-w-10" :disabled="isLoading">
        <NuxtLink to="/" class="flex flex-row items-center gap-4" @click="setOpenMobile(false)">
          <House class="h-5 w-5" />
          <span>Back to dashboard</span>
        </NuxtLink>
      </Button>
      <h1 class="mb-4 text-3xl font-bold">
        Privacy Policy
      </h1>
      <p class="mb-6">
        <strong>Last Updated: </strong> March 3rd 2025
      </p>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          1. Introduction
        </h2>
        <p>
          Welcome to the KUL Health Monitor (the "Website"). This Privacy Policy explains how we collect, use,
          disclose, and protect your personal information when you use our Website. By using the Website, you
          agree to the terms of this Privacy Policy.
        </p>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          2. Definitions
        </h2>
        <ul class="ml-4 list-disc list-inside">
          <li><strong>Account:</strong> A unique account created for you to access our Service.</li>
          <li><strong>Cookies:</strong> Small files placed on your device to track activity on our Website.</li>
          <li><strong>Service:</strong> Refers to the Website and its features.</li>
          <li><strong>Personal Data:</strong> Information that identifies or can be used to identify you.</li>
          <li><strong>Service Provider:</strong> Third-party companies or individuals who process data on our behalf.</li>
        </ul>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          3. Information We Collect
        </h2>

        <h3 class="mt-4 text-xl font-semibold">
          3.1. Personal Information
        </h3>
        <p>
          When you participate in our fitness study, we may collect:
        </p>
        <ul class="ml-4 list-disc list-inside">
          <li><strong>Demographic Information:</strong> Age, gender, and other demographic details provided in the initial survey.</li>
          <li><strong>Email and username</strong>.</li>
          <li><strong>Fitness History:</strong> Information about your exercise habits, fitness level, and use of fitness trackers.</li>
          <li><strong>Health Goals:</strong> Your personal health goals and challenges as provided in the initial survey.</li>
        </ul>

        <h3 class="mt-4 text-xl font-semibold">
          3.2. Fitbit Data
        </h3>
        <p>
          If you connect your Fitbit account, we may collect:
        </p>
        <ul class="ml-4 list-disc list-inside">
          <li>Step count.</li>
          <li>Activity levels (active zone minutes).</li>
          <li>Exercise days.</li>
          <li>Hourly activity.</li>
          <li>Calories burned.</li>
          <li>Heart rate.</li>
          <li>Cardio load.</li>
          <li>Distance covered.</li>
        </ul>
        <p>
          This data is collected only with your explicit consent and used solely for the study.
          We do <strong>NOT</strong> collect exact location data.
        </p>

        <h3 class="mt-4 text-xl font-semibold">
          3.3. Survey Data
        </h3>
        <p>
          We collect responses from the initial survey, weekly check-ins, and final survey to monitor your
          progress and gather feedback.
        </p>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          4. How We Use Your Information
        </h2>
        <p>
          We use your information to:
        </p>
        <ul class="ml-4 list-disc list-inside">
          <li>To provide and improve the Website and its features.</li>
          <li>To monitor your fitness progress and provide feedback.</li>
          <li>To analyze trends and improve the study experience.</li>
          <li>To communicate with you about the study, including updates and reminders.</li>
        </ul>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          5. Data Sharing and Disclosure
        </h2>
        <p>
          We do not sell, rent, or lease your personal information to third parties. However, we may share
          your information in the following circumstances:
        </p>
        <ul class="ml-4 list-disc list-inside">
          <li><strong>With Your Consent:</strong> We may share your information with third parties if you give us explicit consent to do so.</li>
          <li><strong>For Legal Reasons:</strong> We may disclose your information if required by law or in response to valid legal requests, such as subpoenas or court orders.</li>
          <li><strong>Service Providers:</strong> We may share your information with third-party service providers who assist us in operating the Website and conducting the study. These providers are contractually obligated to protect your information and use it only for the purposes we specify.</li>
        </ul>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          6. Data Security
        </h2>
        <p>
          We take the security of your information seriously and implement appropriate technical and
          organizational measures to protect it from unauthorized access, disclosure, or misuse. These
          measures include encryption, access controls, and regular security audits.
        </p>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          7. Data Retention
        </h2>
        <p>
          We retain your personal information only for as long as necessary to fulfill the purposes outlined
          in this Privacy Policy or as required by law. Once the retention period expires, we will delete your
          data.
        </p>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          8. Your Rights
        </h2>
        <p>
          You have the following rights regarding your personal information:
        </p>
        <ul class="ml-4 list-disc list-inside">
          <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
          <li><strong>Correction:</strong> You can request that we correct any inaccurate or incomplete information.</li>
          <li><strong>Deletion:</strong> You can request that we delete your personal information, subject to certain legal obligations.</li>
          <li><strong>Withdraw Consent:</strong> If you have provided consent for us to process your data, you can withdraw that consent at any time.</li>
        </ul>
        <p>
          To exercise these rights, contact us at <a href="mailto:Frederik.Goedkoop@student.uantwerpen.be" class="text-blue-500 hover:underline">Frederik.Goedkoop@student.uantwerpen.be</a>.
        </p>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          9. Children’s Privacy
        </h2>
        <p>
          Our Service is not intended for users under 13. We do not knowingly collect data from children.
        </p>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          10. Third-Party Links
        </h2>
        <p>
          Our Website may contain links to third-party sites. We are not responsible for their privacy
          practices.
        </p>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          11. Changes to This Policy
        </h2>
        <p>
          We may update this policy. Changes will be posted on this page, and we will notify you of
          significant updates.
        </p>
      </section>

      <section class="mb-6">
        <h2 class="mb-2 text-2xl font-semibold">
          12. Contact Us
        </h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or our data practices, please
          contact us at:
        </p>
        <p>
          University of Leuven<br>
          <a href="https://www.kuleuven.be/wieiswie/nl/unit/regional/53386927" class="hover:underline">Biosystemen - Afdeling Dier en Mens, Kasteelpark Arenberg 30, 3001 Leuven</a><br>
          <a href="mailto:Frederik.Goedkoop@student.uantwerpen.be" class="text-blue-500 hover:underline">Frederik.Goedkoop@student.uantwerpen.be</a><br>
          <a href="tel:+32474547625" class="text-blue-500 hover:underline">+32 4 74 54 76 25</a>
        </p>
      </section>
    </Card>
  </section>
</template>
