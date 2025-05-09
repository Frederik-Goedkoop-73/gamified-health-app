<script setup lang="ts">
import type { NavGroup, NavMenu } from '~/types/nav'
import { navMenu } from '@/constants/menus'

const { metaSymbol } = useShortcuts()

const openCommand = ref(false)
const router = useRouter()

defineShortcuts({
  Meta_K: () => openCommand.value = true,
})

const componentsNav = computed<NavGroup | undefined>(() => {
  return navMenu
    .flatMap((nav: NavMenu) => nav.items)
    // @ts-expect-error - We know that the title is unique
    .find((item: NavGroup) => item.title === 'Components')
})

function handleSelectLink(link: string) {
  router.push(link)
  openCommand.value = false
}
</script>

<template>
  <SidebarMenuButton as-child tooltip="Search">
    <Button variant="outline" size="sm" class="text-xs" @click="openCommand = !openCommand">
      <Icon name="i-lucide-search" />
      <span class="font-normal group-data-[collapsible=icon]:hidden">Search pages</span>
      <div class="ml-auto flex items-center space-x-0.5 group-data-[collapsible=icon]:hidden">
        <BaseKbd>{{ metaSymbol }}</BaseKbd>
        <BaseKbd>K</BaseKbd>
      </div>
    </Button>
  </SidebarMenuButton>

  <CommandDialog v-model:open="openCommand">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="General">
        <CommandItem value="Home" @select="handleSelectLink('/')">
          Home
        </CommandItem>
        <CommandItem value="Health" @select="handleSelectLink('/health')">
          Health
        </CommandItem>
      </CommandGroup>

      <CommandSeparator />

      <CommandGroup heading="Progression">
        <CommandItem value="Campaigb" @select="handleSelectLink('/campaign')">
          Campaign
        </CommandItem>
        <CommandItem value="Quests" @select="handleSelectLink('/quests')">
          Quests
        </CommandItem>
        <CommandItem value="Badges" @select="handleSelectLink('/badges')">
          Badges
        </CommandItem>
      </CommandGroup>

      <CommandSeparator />

      <CommandGroup heading="Social">
        <CommandItem value="Health" @select="handleSelectLink('/shop')">
          Shop
        </CommandItem>
        <CommandItem value="Health" @select="handleSelectLink('/profile')">
          Profile
        </CommandItem>
        <CommandItem value="Tasks" @select="handleSelectLink('/leaderboard')">
          Leaderboard
        </CommandItem>
      </CommandGroup>
      <CommandGroup heading="Components">
        <CommandItem
          v-for="nav in componentsNav?.children"
          :key="nav.title"
          :value="nav.title"
          class="gap-2"
          @select="handleSelectLink(nav.link)"
        >
          <Icon name="i-radix-icons-circle" />
          {{ nav.title }}
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>

<style scoped>

</style>
