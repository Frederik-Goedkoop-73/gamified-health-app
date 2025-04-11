<!-- components/AvatarSelector.vue -->
<script setup lang="ts">
import { AVATAR_SPRITES } from '~/types/player'

const playerStore = usePlayerStore()
const { currentAvatarSprite, unlockedAvatars } = storeToRefs(playerStore)

// Example positions - adjust based on your spritesheet
function getSpritePosition(avatarId: string) {
  const pos = AVATAR_SPRITES[avatarId]
  return `background-position: -${pos.x * 1024}px -${pos.y * 1024}px`
}
</script>

<template>
  <div class="avatar-selector">
    <!-- Selected Avatar -->
    <div
      class="avatar-preview"
      :style="getSpritePosition(playerStore.selectedAvatar)"
    />

    <!-- Avatar Grid -->
    <div class="avatar-grid">
      <div
        v-for="avatar in Object.keys(AVATAR_SPRITES)"
        :key="avatar"
        class="avatar-option"
        :class="{
          locked: !playerStore.hasAvatar(avatar),
          selected: playerStore.selectedAvatar === avatar,
        }"
        :style="getSpritePosition(avatar)"
        @click="playerStore.setAvatar(avatar)"
      />
    </div>
  </div>
</template>

<style>
.avatar-preview,
.avatar-option {
  width: 64px;
  height: 64px;
  background-image: url('~/public/avatars/Basic-avatars.png');
  background-size: cover;
}

.avatar-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.locked {
  filter: grayscale(100%);
  opacity: 0.5;
  cursor: not-allowed;
}

.selected {
  border: 2px solid blue;
}
</style>
