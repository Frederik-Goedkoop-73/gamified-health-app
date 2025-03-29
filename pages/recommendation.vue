<script setup lang="ts">
import {
  AudioWaveform,
  Bell,
  BicepsFlexed,
  CalendarCheck,
  ClockArrowUp,
  Dumbbell,
  EyeClosed,
  HeartPulse,
  Lightbulb,
  Sticker,
  Swords,
} from 'lucide-vue-next'

definePageMeta({
  layout: 'blank',
})
</script>

<template>
  <section>
    <div class="mx-auto max-w-6xl rounded-lg p-8 leading-8">
      <div class="mb-6">
        <h1 class="mb-6 text-center text-3xl font-bold">
          Health Recommendations
        </h1>
        <h2 class="mb-6 text-center text-xl text-muted-foreground">
          Want to maintain your lovely new habits?
        </h2>
        <hr class="border-t-2">
      </div>
      <!-- Section 1 - Image on right -->
      <section class="mb-12 flex flex-col items-center gap-8 md:flex-row">
        <div class="md:w-2/3">
          <h2 class="mb-4 text-2xl font-semibold">
            1. Set Realistic Goals
          </h2>
          <div class="space-y-4">
            <p>
              It’s easy to get overly ambitious when setting fitness goals, but consistency is more important than pushing too hard.
              Start small—if you're currently averaging 5,000 steps a day, aim to bump it up by 500 steps next week.
              This might seem insignificant, but these little increases add up.
            </p>
            <Card class="border-green-300">
              <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
                <Strong>Fun fact!</Strong>
                <Sticker class="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7922504/#:~:text=Fourteen%20key%20factors%20were%20identified,initial%20exploration%20of%20participant's%20characteristics%2C" class="decoration-underline" target="_blank">Research</a>
                shows that people who set small,
                incremental goals are more likely to stick with their fitness routines in the long run.
                Think of it like leveling up in a game—each level gets a bit harder, but it's achievable!
              </CardContent>
            </Card>
          </div>
        </div>
        <Card class="md:w-1/3">
          <img
            src="https://media.istockphoto.com/id/1215280342/photo/close-up-shot-red-darts-arrows-in-the-target-center-on-dark-blue-sky-background-business.jpg?s=612x612&w=0&k=20&c=moIlPooiE9Yd3lnJQX6GZB8SZ24A9WDiM8TZJC5u8n8="
            alt="Goal setting example" class="rounded-lg"
          >
        </Card>
      </section>
      <hr class="mb-6">

      <!-- Section 2 - Image on left -->
      <section class="mb-12 flex flex-col items-center gap-8 md:flex-row-reverse">
        <div class="md:w-2/3">
          <h2 class="mb-4 text-2xl font-semibold">
            2. Stay Consistent
          </h2>
          <div class="space-y-4">
            <ul class="space-y-4">
              <li class="flex items-center gap-2">
                <CalendarCheck class="mt-2 size-4 min-w-4 self-start text-muted-foreground" />
                <p>
                  <strong>Create a Workout Schedule:</strong>
                  Decide on specific days and times for your
                  workouts.
                </p>
              </li>
              <li class="flex items-center gap-2">
                <Bell class="mt-2 size-4 min-w-4 self-start text-muted-foreground" />
                <p>
                  <strong>Use Reminders:</strong>
                  Set alarms on your Fitbit to remind you of scheduled
                  workout times.
                </p>
              </li>
              <li class="flex items-center gap-3">
                <Dumbbell class="mt-2 size-4 min-w-4 self-start text-muted-foreground" />
                <p>
                  <strong>Plan for Flexibility:</strong>
                  If a busy day disrupts your routine, squeeze in a
                  10-minute session.
                </p>
              </li>
              <li class="flex items-center gap-2">
                <ClockArrowUp class="mt-2 size-4 min-w-4 self-start text-muted-foreground" />
                <p>
                  <strong>Consistency Over Intensity:</strong>
                  It's better to be consistent with small
                  workouts than to burn out.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <Card class="md:w-1/3">
          <img
            src="https://media.istockphoto.com/id/1591736364/photo/to-beat-around-the-bush-or-move-on-stay-put-or-take-risks-for-new-achievements-spend-energy.jpg?s=612x612&w=0&k=20&c=3nFAMS-c2_pbFfXJaOBpfXdFwQ7jHcYyAowcPkh8HO4="
            alt="Consistency example" class="rounded-lg"
          >
        </Card>
      </section>
      <hr class="mb-6">

      <!-- Section 3 - Image on right -->
      <section class="mb-12 flex flex-col items-center gap-8 md:flex-row">
        <div class="md:w-2/3">
          <h2 class="mb-4 text-2xl font-semibold">
            3. Incorporate Variety
          </h2>
          <div class="space-y-4">
            <p>
              Doing the same workout every day can get boring fast.
              Spice things up by adding variety to your routine!
              You could go for a jog on Monday, do some yoga on Wednesday, and bike on the weekend.
              Variety doesn’t just keep things interesting—it also prevents injuries by working different muscle groups.
            </p>
            <Card class="border-green-300">
              <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
                <Strong>Here’s a fun challenge!</Strong>
                <Swords class="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                Each week, try to introduce a new type of exercise.
                You might discover you love something you’ve never tried before,
                like kickboxing or Zumba!
              </CardContent>
            </Card>
          </div>
        </div>
        <Card class="md:w-1/3">
          <img
            src="https://media.istockphoto.com/id/2164732791/vector/woman-chooses-path-young-girl-makes-decision-career-ambitions-and-motivation-novice.jpg?s=612x612&w=0&k=20&c=Ud0rFcgkVZy-A3vRLPEfyxGXIGUkdfvwhel1HmHlPsU="
            alt="Workout variety example" class="rounded-lg"
          >
        </Card>
      </section>
      <hr class="mb-6">

      <!-- Section 4 - Image on left -->
      <section class="mb-12 flex flex-col items-center gap-8 md:flex-row-reverse">
        <div class="md:w-2/3">
          <h2 class="mb-4 text-2xl font-semibold">
            4. Leverage Your Fitness Data
          </h2>
          <div class="space-y-4">
            <p>
              Your Fitbit isn't just counting your steps—it’s giving you a treasure trove of health data.
              Dive into the app and check out your trends.
              Are you hitting more steps on certain days?
              Is your heart rate lowering as you get fitter?
              Use this information to challenge yourself.
              For example, if your step count tends to drop on weekends,
              plan an outdoor activity or a fun hike with friends.
            </p>
            <Card class="border-green-300">
              <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
                <Strong>Pro tip:</Strong>
                <HeartPulse class="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                Keep an eye on your <strong>resting heart rate</strong>—it's a great indicator of overall fitness.
                As you get more active, your resting heart rate may gradually decrease,
                hich means your heart is getting stronger!
              </CardContent>
            </Card>
          </div>
        </div>
        <Card class="md:w-1/3">
          <img
            src="https://media.istockphoto.com/id/2074435669/photo/investor-couple-stock-trading-together.jpg?s=612x612&w=0&k=20&c=kikRIMcl_oKWFye9QGv2Zo2UqWzhiEWlcAn5KWOv3yg="
            alt="Fitness data example" class="rounded-lg"
          >
        </Card>
      </section>
      <hr class="mb-6">

      <!-- Section 5 - Image on right -->
      <section class="mb-12 flex flex-col items-center gap-8 md:flex-row">
        <div class="md:w-2/3">
          <h2 class="mb-4 text-2xl font-semibold">
            5. Take Breaks
          </h2>
          <div class="space-y-4">
            <ul class="space-y-4">
              <li class="flex items-center gap-2">
                <CalendarCheck class="mt-2 size-4 min-w-4 self-start text-muted-foreground" />
                <p>
                  <strong>Plan Recovery Days:</strong>
                  Include 1-2 rest days per week with light activities.
                </p>
              </li>
              <li class="flex items-center gap-2">
                <AudioWaveform class="mt-2 size-4 min-w-4 self-start text-muted-foreground" />
                <p>
                  <strong>Listen to Your Body:</strong>
                  If you feel fatigued or sore, prioritize rest.
                </p>
              </li>
              <li class="flex items-center gap-3">
                <BicepsFlexed class="mt-2 size-4 min-w-4 self-start text-muted-foreground" />
                <p>
                  <strong>Incorporate Mobility Work:</strong>
                  On rest days, dedicate 10-15 minutes to stretches.
                </p>
              </li>
              <li class="flex items-center gap-2">
                <EyeClosed class="mt-2 size-4 min-w-4 self-start text-muted-foreground" />
                <p>
                  <strong>Monitor Fatigue with Fitbit:</strong>
                  Check your resting heart rate for signs of overexertion.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <Card class="md:w-1/3">
          <img
            src="https://media.istockphoto.com/id/1428299005/photo/man-is-sitting-in-a-camping-chair-on-the-background-of-a-forest-lake-on-a-beautiful-summer.jpg?s=612x612&w=0&k=20&c=dQZLIQGXpyLxWvtdpsRkpRXEqM4vZCGefzPtV9h_9Uk="
            alt="Rest and recovery example" class="rounded-lg"
          >
        </Card>
      </section>
      <hr class="mb-6">

      <!-- Section 6 - Image on left -->
      <section class="mb-12 flex flex-col items-center gap-8 md:flex-row-reverse">
        <div class="md:w-2/3">
          <h2 class="mb-4 text-2xl font-semibold">
            6. Track Progress
          </h2>
          <div class="space-y-4">
            <p>
              There’s nothing quite like seeing your progress over time.
              Whether it's an increase in steps, a lower resting heart rate,
              or more active minutes, tracking your fitness journey can be incredibly
              motivating.
              Use your Fitbit to visualize this data—graphs and charts can
              show you just how far you’ve come.
            </p>
            <Card class="border-green-300">
              <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
                <Strong>Here's a fun idea:</Strong>
                <Lightbulb class="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                Reward yourself when you hit a new milestone,
                like reaching 10,000 steps consistently for a week or completing your first 5K.
                Treat yourself to something that makes you feel good,
                like a new pair of workout shoes or a relaxing day at the spa.
              </CardContent>
            </Card>
          </div>
        </div>
        <Card class="md:w-1/3">
          <img
            src="https://media.istockphoto.com/id/1511226415/photo/unlock-potential-of-business-success-stairs-dart-and-dartboard-targets-magnifying-glass-with.jpg?s=612x612&w=0&k=20&c=AyZSkt_ajo8JfbwJp9p86Ew24N37tMoq60hR5k_g9Rk="
            alt="Progress tracking example" class="rounded-lg"
          >
        </Card>
      </section>
      <hr class="mb-6">

      <!-- Section 7 - Image on right -->
      <section class="mb-12 flex flex-col items-center gap-8 md:flex-row">
        <div class="md:w-2/3">
          <h2 class="mb-4 text-2xl font-semibold">
            7. Seek Support
          </h2>
          <div class="space-y-4">
            <p>
              Fitness is more fun with friends!
              Whether you’re joining a virtual workout group or simply competing with a
              friend to see who can take the most steps, having an accountability
              buddy can make a huge difference. Humans are social creatures,
              after all—why not use that to your fitness advantage?
            </p>
            <p>
              You can even start a friendly competition with your friends using your Fitbit.
              Set up challenges to see who can rack up the most steps in a week or burn
              the most active minutes.
              Plus, a little friendly rivalry never hurt anyone!
            </p>
          </div>
        </div>
        <Card class="md:w-1/3">
          <img
            src="https://media.istockphoto.com/id/2152790569/photo/people-pov-and-holding-hands-for-mountain-hike-or-friends-support-for-exercise-challenge.jpg?s=612x612&w=0&k=20&c=WAK3e8_x1KasFtUZl1ppijQCiMigs893v3DiV4zAglc="
            alt="Fitness support example" class="rounded-lg"
          >
        </Card>
      </section>
      <hr class="mb-6">

      <!-- Section 8 - Image on left -->
      <section class="mb-12 flex flex-col items-center gap-8 md:flex-row-reverse">
        <div class="md:w-2/3">
          <h2 class="mb-4 text-2xl font-semibold">
            8. Utilize Resources
          </h2>
          <div class="space-y-4">
            <p>
              Fitness doesn’t have to be complicated, and you don’t have to do it alone.
              There are tons of free resources out there to help you along the way,
              from workout videos to local running groups.
              Whether you’re looking for a new routine, guidance on form,
              or just some fitness inspiration,
              there’s a whole world of options to explore.
              Additionally, you can consult the <a href="https://www.kuleuven.be/sport/eng/univ-fit/team" class="decoration-underline" target="_blank">KUL's sport team </a> for fitnessprograms, coaching,
              and other wellness services!
            </p>
            <Card class="border-green-300">
              <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
                <Strong>Fun Fact!</Strong>
                <Sticker class="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                Did you know that outdoor exercise can improve your mood more than indoor workouts?
                So, if the weather’s nice, head outside!
                Fresh air, sunlight, and movement—a winning combo.
              </CardContent>
            </Card>
          </div>
        </div>
        <Card class="md:w-1/3">
          <img
            src="https://media.istockphoto.com/id/2021524839/photo/business-finance-and-investment-analyze-economic-growth-charts-for-informed-business-finance.jpg?s=612x612&w=0&k=20&c=hcYK8iRAZyklc0gQUpUDf3TJX2EBqLvwp3yZmZP5lEA="
            alt="Fitness resources example" class="rounded-lg"
          >
        </Card>
      </section>
    </div>
  </section>
</template>
