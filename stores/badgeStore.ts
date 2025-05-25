import { doc, getDoc, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { useFirebase } from '~/server/utils/firebase'

export const useBadgeStore = defineStore('badges', () => {
  const badgeCount = ref(0)
  const claimedBadgeIds = ref<string[]>([])

  async function fetchBadges() {
    const { auth, db } = useFirebase()
    const user = auth.currentUser
    if (!user)
      return

    const userDocRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(userDocRef)
    if (docSnap.exists()) {
      const data = docSnap.data()
      claimedBadgeIds.value = data.claimedBadgeIds ?? []
      badgeCount.value = data.badgeCount ?? 0
    }
  }

  function claimBadge(id: string) {
    if (!claimedBadgeIds.value.includes(id)) {
      claimedBadgeIds.value.push(id)
      badgeCount.value += 1
      saveToFirebase()
    }
  }

  async function saveToFirebase() {
    const { auth, db } = useFirebase()
    const user = auth.currentUser
    if (!user)
      return

    await setDoc(doc(db, 'users', user.uid), {
      claimedBadgeIds: claimedBadgeIds.value,
      badgeCount: badgeCount.value,
    }, { merge: true })
  }

  return {
    badgeCount,
    claimedBadgeIds,
    fetchBadges,
    claimBadge,
  }
})
